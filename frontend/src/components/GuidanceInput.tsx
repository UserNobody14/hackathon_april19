import { useState } from 'react';
import { Story } from '../types';

interface GuidanceInputProps {
  story: Story;
  onSubmitGuidance: (guidance: string) => void;
  isLoading: boolean;
}

const GuidanceInput = ({ story, onSubmitGuidance, isLoading }: GuidanceInputProps) => {
  const [guidance, setGuidance] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guidance.trim()) {
      onSubmitGuidance(guidance);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-12">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">Guide Your Character</h2>
        <p className="text-gray-300 mb-4">
          Provide instructions for how your character should behave throughout the story.
          What kind of decisions should they make? What is their personality like?
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={guidance}
            onChange={(e) => setGuidance(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white min-h-32 mb-4"
            placeholder="Enter your guidance here... (e.g., 'Act cautiously and avoid risks. Look for peaceful solutions to problems.')"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-300">Goal: <span className="text-blue-400">{story.goal}</span></h3>
            </div>
            <button
              type="submit"
              disabled={!guidance.trim() || isLoading}
              className={`px-6 py-2 rounded-md ${
                !guidance.trim() || isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              {isLoading ? 'Processing...' : 'Start Adventure'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuidanceInput; 