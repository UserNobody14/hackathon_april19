import { useState, useCallback } from 'react';
import { Story, SimulationResult, SimulationResults, GoalEvaluation } from '../types';

// API endpoint for our FastAPI backend
const API_URL = 'http://localhost:8000';

// Process a single beat through our backend
const simulateBeat = async (
  beat: { id: string; text: string; order: number },
  guidance: string,
  goal: string,
  previousResults: SimulationResults = []
): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/api/simulate-beat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        beat,
        guidance,
        goal,
        previous_results: previousResults.map(r => ({ beatId: r.beatId, response: r.response }))
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const result = await response.json();
    return result.response;
  } catch (error) {
    console.error('Error processing beat:', error);
    return 'Something went wrong while processing this beat.';
  }
};

// Evaluate if the goal was accomplished
const evaluateGoal = async (
  goal: string,
  guidance: string,
  results: SimulationResults
): Promise<GoalEvaluation> => {
  try {
    const response = await fetch(`${API_URL}/api/evaluate-goal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        goal,
        guidance,
        results: results.map(r => ({ beatId: r.beatId, response: r.response }))
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error evaluating goal:', error);
    return {
      accomplished: false,
      explanation: 'Could not evaluate goal due to an error.'
    };
  }
};

export const useAISimulation = (story: Story | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [results, setResults] = useState<SimulationResults>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [goalEvaluation, setGoalEvaluation] = useState<GoalEvaluation | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const runSimulation = useCallback(async (guidance: string) => {
    if (!story) return;
    
    setIsLoading(true);
    setResults([]);
    setCurrentBeatIndex(0);
    setIsComplete(false);
    setGoalEvaluation(null);
    
    try {
      // Option 1: Process beats one by one with UI updates between each
      const simulationResults: SimulationResults = [];
      
      for (let i = 0; i < story.beats.length; i++) {
        const beat = story.beats[i];
        setCurrentBeatIndex(i);
        
        // Call our backend API to process this beat
        const response = await simulateBeat(
          beat,
          guidance,
          story.goal,
          simulationResults
        );
        
        const result: SimulationResult = {
          beatId: beat.id,
          response
        };
        
        simulationResults.push(result);
        setResults([...simulationResults]);
        
        // Small delay between beats for UX
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Option 2 (Alternative): Process all beats at once
      // Uncomment to use this approach instead
      /*
      try {
        const response = await fetch(`${API_URL}/api/simulate-story`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            story,
            guidance,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('Error processing story:', error);
      }
      */

      // Now evaluate if the goal was accomplished
      setIsEvaluating(true);
      const evaluation = await evaluateGoal(story.goal, guidance, simulationResults);
      setGoalEvaluation(evaluation);
      setIsEvaluating(false);
      
    } catch (error) {
      console.error('Error in simulation:', error);
    } finally {
      setIsComplete(true);
      setIsLoading(false);
    }
  }, [story]);

  return {
    runSimulation,
    isLoading,
    currentBeatIndex,
    results,
    isComplete,
    goalEvaluation,
    isEvaluating
  };
};

export default useAISimulation; 