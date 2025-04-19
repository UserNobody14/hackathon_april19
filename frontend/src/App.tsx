import { useState } from 'react'
import StorySelector from './components/StorySelector'
import StoryBeats from './components/StoryBeats'
import GuidanceInput from './components/GuidanceInput'
import SimulationResults from './components/SimulationResults'
import LoadingIndicator from './components/LoadingIndicator'
import GoalEvaluation from './components/GoalEvaluation'
import useAISimulation from './hooks/useAISimulation'
import { sampleStories } from './data/sampleStories'
import { Story } from './types'
import './App.css'

function App() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [userGuidance, setUserGuidance] = useState<string | null>(null)
  
  const {
    runSimulation,
    isLoading,
    currentBeatIndex,
    results,
    isComplete,
    goalEvaluation,
    isEvaluating
  } = useAISimulation(selectedStory)
  
  const handleSelectStory = (story: Story) => {
    setSelectedStory(story)
    setUserGuidance(null)
  }
  
  const handleSubmitGuidance = (guidance: string) => {
    setUserGuidance(guidance)
    runSimulation(guidance)
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">AI Story Simulator</h1>
        <p className="text-xl text-gray-400">
          Create your own AI-driven adventure by guiding your character through the story
        </p>
      </header>
      
      <main>
        {!selectedStory ? (
          <StorySelector 
            stories={sampleStories} 
            onSelectStory={handleSelectStory} 
          />
        ) : !userGuidance ? (
          <div>
            <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold">{selectedStory.title}</h2>
              <button 
                onClick={() => setSelectedStory(null)}
                className="px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded-md"
              >
                Back to Stories
              </button>
            </div>
            
            <StoryBeats 
              story={selectedStory} 
              simulationResults={[]} 
              currentBeatIndex={0} 
            />
            
            <GuidanceInput 
              story={selectedStory} 
              onSubmitGuidance={handleSubmitGuidance}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold">{selectedStory.title}</h2>
              {isComplete && (
                <button 
                  onClick={() => {
                    setSelectedStory(null)
                    setUserGuidance(null)
                  }}
                  className="px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded-md"
                >
                  New Adventure
                </button>
              )}
            </div>
            
            {!isComplete && (
              <StoryBeats 
                story={selectedStory} 
                simulationResults={results} 
                currentBeatIndex={currentBeatIndex} 
              />
            )}
            
            <SimulationResults 
              story={selectedStory} 
              results={results}
              isComplete={isComplete} 
            />
            
            {isComplete && (
              <div className="max-w-4xl mx-auto">
                <GoalEvaluation 
                  evaluation={goalEvaluation}
                  isEvaluating={isEvaluating}
                  goal={selectedStory.goal}
                />
              </div>
            )}
          </div>
        )}
      </main>
      
      {(isLoading || isEvaluating) && (
        <LoadingIndicator message={
          isEvaluating 
            ? "Evaluating if you achieved the goal..." 
            : currentBeatIndex === 0 
              ? "Starting your adventure..." 
              : `Processing beat ${currentBeatIndex + 1}...`
        } />
      )}
      
      <footer className="text-center mt-20 text-gray-500 text-sm">
        <p>AI Story Simulator &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
