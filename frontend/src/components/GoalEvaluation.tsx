import { GoalEvaluation as GoalEvaluationType } from '../types';

interface GoalEvaluationProps {
  evaluation: GoalEvaluationType | null;
  isEvaluating: boolean;
  goal: string;
}

const GoalEvaluation = ({ evaluation, isEvaluating, goal }: GoalEvaluationProps) => {
  if (isEvaluating) {
    return (
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-pulse">
        <h3 className="text-lg font-medium text-blue-800">Evaluating Goal Achievement...</h3>
        <p className="text-sm text-blue-600">
          Analyzing if your guidance helped achieve: "{goal}"
        </p>
      </div>
    );
  }

  if (!evaluation) {
    return null;
  }

  return (
    <div className={`mt-6 p-4 border rounded-lg ${evaluation.accomplished ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
      <h3 className={`text-lg font-bold mb-2 ${evaluation.accomplished ? 'text-green-800' : 'text-red-800'}`}>
        {evaluation.accomplished ? '🎉 Goal Accomplished!' : '❌ Goal Not Accomplished'}
      </h3>
      <p className="text-sm mb-2">
        <strong>Goal:</strong> {goal}
      </p>
      <p className={`text-sm ${evaluation.accomplished ? 'text-green-700' : 'text-red-700'}`}>
        {evaluation.explanation}
      </p>
    </div>
  );
};

export default GoalEvaluation; 