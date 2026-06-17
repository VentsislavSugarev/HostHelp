import { Vote } from '../../../domain/models/Vote';
import { VoteRepository } from '../../../domain/repositories/VoteRepository';

export class SupabaseVoteRepository implements VoteRepository {
  async getVotesByBattleId(battleId: string): Promise<Vote[]> {
    return [];
  }

  async castVote(vote: Partial<Vote>): Promise<Vote> {
    return {
      id: Math.random().toString(36).substring(2),
      battleId: vote.battleId || '',
      judgeId: vote.judgeId || '',
      votedMcId: vote.votedMcId || null,
      isReplica: vote.isReplica ?? false,
      createdAt: new Date()
    };
  }

  async deleteVotesByBattleId(battleId: string): Promise<void> {
    return Promise.resolve();
  }
}