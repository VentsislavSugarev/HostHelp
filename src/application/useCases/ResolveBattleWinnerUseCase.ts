// src/application/usecases/ResolveBattleWinnerUseCase.ts
import { BattleRepository } from '../../domain/repositories/BattleRepository';
import { BattleResultType } from '../../domain/models/Battle';

interface ResolveBattleInput {
  battleId: string;
  resultType: BattleResultType;
  winningTeamNameOrAka: string | null;
}

export class ResolveBattleWinnerUseCase {
  constructor(private battleRepository: BattleRepository) {}

  async execute(input: ResolveBattleInput): Promise<void> {
    const battle = await this.battleRepository.getBattleById(input.battleId);
    if (!battle) {
      throw new Error('The battle you are trying to resolve does not exist.');
    }

    if (input.resultType === 'replica' || input.resultType === '2_replicas') {
      await this.battleRepository.updateBattleResult(input.battleId, input.resultType, null);
    } else {
      if (!input.winningTeamNameOrAka) {
        throw new Error('A winner must be specified for direct decisions.');
      }
      await this.battleRepository.updateBattleResult(input.battleId, input.resultType, input.winningTeamNameOrAka);
    }
  }
}