export interface Story {
  id: string;
  title: string;
  description: string;
  beats: StoryBeat[];
  goal: string;
}

export interface StoryBeat {
  id: string;
  text: string;
  order: number;
}

export interface SimulationResult {
  beatId: string;
  response: string;
}

export type SimulationResults = SimulationResult[];

export interface GoalEvaluation {
  accomplished: boolean;
  explanation: string;
} 