# AI Adventure Guide Backend

This is the FastAPI backend for the AI Adventure Guide application, which handles communication with Claude and provides API endpoints for the frontend.

## Setup Instructions

1. Make sure you have Python 3.7+ installed.

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the root directory with your Claude API key:
   ```
   CLAUDE_API_KEY=your_claude_api_key_here
   ```
   You can copy the `.env.example` file as a template.

## Running the Backend

Start the FastAPI server with:

```bash
python main.py
```

The server will start on http://localhost:8000

## API Endpoints

### GET /
- Returns a welcome message
- Response: `{"message": "Welcome to AI Adventure Guide API"}`

### POST /api/simulate-beat
- Processes a single story beat with Claude
- Request body:
  ```json
  {
    "beat": {
      "id": "string",
      "text": "string",
      "order": 0
    },
    "guidance": "string",
    "goal": "string",
    "previous_results": [
      {
        "beatId": "string",
        "response": "string"
      }
    ]
  }
  ```
- Response:
  ```json
  {
    "beatId": "string",
    "response": "string"
  }
  ```

### POST /api/simulate-story
- Processes an entire story with all beats sequentially
- Request body:
  ```json
  {
    "story": {
      "id": "string",
      "title": "string",
      "description": "string",
      "beats": [
        {
          "id": "string",
          "text": "string",
          "order": 0
        }
      ],
      "goal": "string"
    },
    "guidance": "string"
  }
  ```
- Response:
  ```json
  {
    "results": [
      {
        "beatId": "string",
        "response": "string"
      }
    ]
  }
  ```

## Development

The backend is built with:
- FastAPI - Web framework
- Pydantic - Data validation
- HTTPX - Async HTTP client
- Uvicorn - ASGI server
