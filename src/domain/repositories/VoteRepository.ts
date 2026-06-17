import { Vote } from '../models/Vote';

export interface VoteRepository {
  getVotesByBattleId(battleId: string): Promise<Vote[]>;
  castVote(vote: Partial<Vote>): Promise<Vote>;
  deleteVotesByBattleId(battleId: string): Promise<void>;
}