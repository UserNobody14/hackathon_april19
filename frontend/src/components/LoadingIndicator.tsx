interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator = ({ message = 'Processing...' }: LoadingIndicatorProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-200">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator; 