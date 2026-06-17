import { Battle } from '../models/Battle';

export interface BattleRepository {
  getBattleById(id: string): Promise<Battle | null>;
  getBattlesByTournamentId(tournamentId: string): Promise<Battle[]>;
  createBattle(battle: Partial<Battle>): Promise<Battle>;
  updateBattleStatus(id: string, status: Battle['status'], winnerId: string | null): Promise<void>;
  setReplicaFlag(id: string, isReplica: boolean): Promise<void>;
  deleteBattle(id: string): Promise<void>; // Por si improvisas y cancelas un enfrentamiento
}