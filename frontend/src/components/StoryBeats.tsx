import { Story, SimulationResult } from '../types';

interface StoryBeatsProps {
  story: Story;
  simulationResults: SimulationResult[];
  currentBeatIndex: number;
}

const StoryBeats = ({ story, simulationResults, currentBeatIndex }: StoryBeatsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Story Progress</h2>
      
      {/* Progress bar */}
      <div className="flex items-center mb-8">
        <div className="w-full bg-gray-800 rounded-full h-3 shadow-inner overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${Math.min(100, (currentBeatIndex / story.beats.length) * 100)}%` }}
          ></div>
        </div>
        <span className="ml-4 text-sm font-semibold bg-gray-800 px-3 py-1 rounded-full">
          {currentBeatIndex}/{story.beats.length}
        </span>
      </div>
      
      <div className="space-y-8 p-4 m-4">
        {story.beats.map((beat, index) => {
          const result = simulationResults.find(r => r.beatId === beat.id);
          const isActive = index === currentBeatIndex;
          const isCompleted = index < currentBeatIndex;
          
          return (
            <div 
              key={beat.id}
              className={`rounded-xl shadow-lg transition-all duration-300 overflow-hidden ${
                isActive 
                  ? 'border-2 border-blue-500 ring-2 ring-blue-400 ring-opacity-50' 
                  : isCompleted 
                    ? 'border border-green-500' 
                    : 'border border-gray-700'
              }`}
            >
              {/* Status indicator */}
              <div className={`h-1 w-full ${
                isActive ? 'bg-blue-500' : isCompleted ? 'bg-green-500' : 'bg-gray-700'
              }`}></div>
              
              <div className="p-5">
                {/* Beat header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {/* <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-2 ${
                      isActive 
                        ? 'bg-blue-500 text-white' 
                        : isCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-800 text-gray-400'
                    }`}>
                      {index + 1}
                    </div> */}
                    <h3 className="font-bold text-lg">
                      {isCompleted && '✓ '}
                      {isActive && '→ '}
                      Beat {index + 1}
                    </h3>
                  </div>
                  
                  <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                    isActive 
                      ? 'bg-blue-900/40 text-blue-300' 
                      : isCompleted 
                        ? 'bg-green-900/40 text-green-300' 
                        : 'bg-gray-800 text-gray-500'
                  }`}>
                    {isActive ? 'Current' : isCompleted ? 'Completed' : 'Pending'}
                  </div>
                </div>
                
                {/* Beat content */}
                <div className={`p-4 rounded-lg mb-3 ${
                  isActive ? 'bg-gray-800/80' : 'bg-gray-800/40'
                }`}>
                  <p className="text-gray-200 font-medium">{beat.text}</p>
                </div>
                
                {/* AI Response */}
                {result && (
                  <div className="mt-5 bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0" 
                        width="20" 
                        height="20" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-blue-400 font-semibold">AI Response</span>
                    </div>
                    <p className="text-blue-100">{result.response}</p>
                  </div>
                )}
                
                {isActive && !result && (
                  <div className="mt-5 bg-gray-800/60 rounded-lg p-4 border border-dashed border-gray-600 text-center">
                    <p className="text-gray-400 italic">Waiting for AI response...</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoryBeats; 