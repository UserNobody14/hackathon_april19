import { useState, useCallback } from 'react';
import { Story, SimulationResult, SimulationResults } from '../types';

// This is a mock implementation that would be replaced with actual API calls
// to your AI backend service
const simulateBeat = async (
  beat: { id: string; text: string },
  guidance: string,
  goal: string
): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, you would use these parameters in your API call
  console.log(`Processing beat: ${beat.id} with guidance: ${guidance} for goal: ${goal}`);
  
  // This would be replaced with actual API call to your AI service
  const responses = [
    "I approach cautiously, observing my surroundings with careful attention.",
    "I decide to follow the blue path, as it seems more peaceful and aligned with my cautious nature.",
    "I greet the fairy with a gentle voice, asking if they know anything about the treasure.",
    "I listen carefully to the whispers, trying to discern if they're friendly or threatening.",
    "I examine the runes without touching anything, looking for clues about how to proceed safely."
  ];
  
  // For demo purposes, just return a random response
  return responses[Math.floor(Math.random() * responses.length)];
};

export const useAISimulation = (story: Story | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [results, setResults] = useState<SimulationResults>([]);
  const [isComplete, setIsComplete] = useState(false);

  const runSimulation = useCallback(async (guidance: string) => {
    if (!story) return;
    
    setIsLoading(true);
    setResults([]);
    setCurrentBeatIndex(0);
    setIsComplete(false);
    
    const simulationResults: SimulationResults = [];
    
    // Process each beat sequentially
    for (let i = 0; i < story.beats.length; i++) {
      const beat = story.beats[i];
      setCurrentBeatIndex(i);
      
      try {
        // Call your AI service to process this beat with the user's guidance
        const response = await simulateBeat(beat, guidance, story.goal);
        
        const result: SimulationResult = {
          beatId: beat.id,
          response
        };
        
        simulationResults.push(result);
        setResults([...simulationResults]);
        
        // Small delay between beats for UX
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Error processing beat:', error);
        break;
      }
    }
    
    setIsComplete(true);
    setIsLoading(false);
  }, [story]);

  return {
    runSimulation,
    isLoading,
    currentBeatIndex,
    results,
    isComplete
  };
};

export default useAISimulation; 