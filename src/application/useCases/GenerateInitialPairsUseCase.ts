import { BattleRepository } from '../../domain/repositories/BattleRepository';
import { BattleParticipantRepository } from '../../domain/repositories/BattleParticipantRepository';
import { Battle } from '../../domain/models/Battle';

export class GenerateInitialPairsUseCase {
  constructor(
    private battleRepository: BattleRepository,
    private participantRepository: BattleParticipantRepository
  ) {}

  async execute(eventId: string, mcIds: string[]): Promise<Battle[]> {
    if (mcIds.length < 2) {
      throw new Error('At least 2 MCs are required to generate matchups.');
    }

    const shuffledMcs = [...mcIds];
    for (let i = shuffledMcs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledMcs[i], shuffledMcs[j]] = [shuffledMcs[j], shuffledMcs[i]];
    }

    const createdBattles: Battle[] = [];

    for (let i = 0; i < shuffledMcs.length; i += 2) {
      if (!shuffledMcs[i + 1]) break; 

      const mc1 = shuffledMcs[i];
      const mc2 = shuffledMcs[i + 1];

      const newBattle = await this.battleRepository.createBattle({
        tournamentId: eventId,
        status: 'PENDING',
        isReplica: false
      });

      await this.participantRepository.addParticipantsToBattle([
        { battleId: newBattle.id, mcId: mc1 },
        { battleId: newBattle.id, mcId: mc2 }
      ]);

      createdBattles.push(newBattle);
    }

    return createdBattles;
  }
}