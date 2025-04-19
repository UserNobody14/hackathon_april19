from anthropic.types import ModelParam
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from anthropic import Anthropic

# Load environment variables from .env file
load_dotenv()

# Get Claude API key from environment variable
CLAUDE_API_KEY = os.getenv("CLAUDE_API_KEY")
if not CLAUDE_API_KEY:
    print("Warning: CLAUDE_API_KEY not found in environment variables")

app = FastAPI(title="AI Adventure Guide API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models for request/response
class StoryBeat(BaseModel):
    id: str
    text: str
    order: int


class Story(BaseModel):
    id: str
    title: str
    description: str
    beats: List[StoryBeat]
    goal: str


class BeatRequest(BaseModel):
    beat: StoryBeat
    guidance: str
    goal: str
    previous_results: Optional[List[dict]] = []


class SimulationResult(BaseModel):
    beatId: str
    response: str


def get_anthropic_client():
    """Creates an Anthropic client."""
    return Anthropic(api_key=CLAUDE_API_KEY)


@app.get("/")
async def read_root():
    return {"message": "Welcome to AI Adventure Guide API"}


@app.post("/api/simulate-beat", response_model=SimulationResult)
async def simulate_beat(
    request: BeatRequest, client: Anthropic = Depends(get_anthropic_client)
):
    """Process a single story beat with Claude."""
    try:
        # Construct context from previous beats if any
        context = ""
        if request.previous_results:
            context = "Previous events in the story:\n"
            for result in request.previous_results:
                context += f"- {result['response']}\n"
            context += "\n"

        # Construct the prompt for Claude
        prompt = f"""
You are roleplaying as an AI adventure guide. You need to respond to this story beat:

{request.beat.text}

User's guidance for the character: {request.guidance}

Story goal: {request.goal}

{context}

Generate a first-person narrative response describing what the character does next. 
Keep the response concise (1-3 sentences) and focus on actions and decisions.
Don't label or preface your response - just write the character's action directly.
"""

        # Call Claude API
        modelv: ModelParam = "claude-3-7-sonnet-latest"
        message = client.messages.create(
            model=modelv,
            max_tokens=150,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )

        # Extract Claude's response text
        ai_response = message.content[0].text
        # Return the result
        return SimulationResult(beatId=request.beat.id, response=ai_response)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/simulate-story")
async def simulate_story(
    story: Story, guidance: str, client: Anthropic = Depends(get_anthropic_client)
):
    """Process an entire story with all beats sequentially."""
    results = []

    for beat in sorted(story.beats, key=lambda x: x.order):
        # Create beat request
        request = BeatRequest(
            beat=beat, guidance=guidance, goal=story.goal, previous_results=results
        )

        # Process the beat
        result = await simulate_beat(request, client)
        results.append({"beatId": result.beatId, "response": result.response})

    return {"results": results}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
