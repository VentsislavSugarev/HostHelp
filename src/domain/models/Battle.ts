export type BattleStatus = 'PENDING' | 'ON_GOING' | 'FINISHED';

export interface Battle {
  id: string;
  tournamentId: string | null;
  status: BattleStatus;
  winnerId: string | null;
  isReplica: boolean;
  createdAt: Date;
}