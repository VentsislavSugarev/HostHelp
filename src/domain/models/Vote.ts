export interface Vote {
  id: string;
  battleId: string;
  judgeId: string;
  votedMcId: string | null;
  isReplica: boolean;
  createdAt: Date;
}