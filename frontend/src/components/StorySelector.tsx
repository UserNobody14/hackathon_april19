import { useState } from 'react';
import { Story } from '../types';

interface StorySelectorProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
}

const StorySelector = ({ stories, onSelectStory }: StorySelectorProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Choose Your Adventure</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
            <p className="text-gray-300 mb-2">{story.description}</p>
            
            <div className="flex justify-between items-center mt-2">
              <button 
                onClick={() => toggleExpand(story.id)}
                className="text-blue-400 hover:text-blue-300"
              >
                {expandedId === story.id ? 'Hide Details' : 'Show Details'}
              </button>
              <button 
                onClick={() => onSelectStory(story)}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded"
              >
                Select
              </button>
            </div>
            
            {expandedId === story.id && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Goal: {story.goal}</h4>
                <h4 className="font-medium mb-2">Story Beats:</h4>
                <ul className="list-disc pl-5">
                  {story.beats.map((beat) => (
                    <li key={beat.id} className="mb-1 text-sm text-gray-300">
                      {beat.text.substring(0, 100)}
                      {beat.text.length > 100 ? '...' : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorySelector; 