import { Story, SimulationResults as SimulationResultsType } from '../types';

interface SimulationResultsProps {
  story: Story;
  results: SimulationResultsType;
  isComplete: boolean;
}

const SimulationResults = ({ story, results, isComplete }: SimulationResultsProps) => {
  if (results.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">
        {isComplete ? 'Adventure Complete!' : 'Adventure in Progress...'}
      </h2>
      
      {isComplete && (
        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-6">
          <h3 className="text-xl font-medium text-green-400 mb-2">Goal Reached</h3>
          <p className="text-gray-300">{story.goal}</p>
        </div>
      )}
      
      <div className="space-y-6">
        {results.map((result, index) => {
          const beat = story.beats.find(b => b.id === result.beatId);
          if (!beat) return null;
          
          return (
            <div key={result.beatId} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-700 p-3">
                <h3 className="font-medium">Beat {index + 1}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-300 mb-4">{beat.text}</p>
                <div className="pl-4 border-l-2 border-blue-500">
                  <p className="text-blue-300">{result.response}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {isComplete && (
        <div className="mt-8 text-center">
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-md"
          >
            Start a New Adventure
          </button>
        </div>
      )}
    </div>
  );
};

export default SimulationResults; 