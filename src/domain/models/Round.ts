export type RoundFormat = 'EASY_MODE' | 'HARD_MODE' | 'MINUTES' | '4X4' | 'DELUXE';

export interface Round {
  id: string;
  battleId: string;
  stageNumber: number;
  format: RoundFormat;
  timeLimitInSeconds: number;
  isFinished: boolean;
}