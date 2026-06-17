import { BattleRepository } from '../../domain/repositories/BattleRepository';

interface ResolveBattleInput {
  battleId: string;
  isReplica: boolean;
  winnerMcId: string | null;
}

export class ResolveBattleWinnerUseCase {
  constructor(private battleRepository: BattleRepository) {}

  async execute(input: ResolveBattleInput): Promise<void> {
    const battle = await this.battleRepository.getBattleById(input.battleId);
    if (!battle) {
      throw new Error('The battle you are trying to resolve does not exist.');
    }

    if (input.isReplica) {
      await this.battleRepository.setReplicaFlag(input.battleId, true);
      await this.battleRepository.updateBattleStatus(input.battleId, 'ON_GOING', null);
    } else {
      if (!input.winnerMcId) {
        throw new Error('A winnerMcId must be provided if the battle is not a replica.');
      }
      
      await this.battleRepository.setReplicaFlag(input.battleId, false);
      await this.battleRepository.updateBattleStatus(input.battleId, 'FINISHED', input.winnerMcId);
    }
  }
}