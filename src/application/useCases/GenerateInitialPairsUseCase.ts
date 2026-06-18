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

    // Algoritmo Shuffling (Mezcla aleatoria de plaza)
    const shuffledMcs = [...mcIds];
    for (let i = shuffledMcs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledMcs[i], shuffledMcs[j]] = [shuffledMcs[j], shuffledMcs[i]];
    }

    const createdBattles: Battle[] = [];
    let orderCounter = 1;

    for (let i = 0; i < shuffledMcs.length; i += 2) {
      if (!shuffledMcs[i + 1]) break; 

      const mc1Id = shuffledMcs[i];
      const mc2Id = shuffledMcs[i + 1];

      // Creamos la batalla alineada con las columnas reales de Supabase
      const newBattle = await this.battleRepository.createBattle({
        event_id: eventId,
        stage: 'Round of 16', // O dinámico según los MCs apuntados
        battle_order: orderCounter++,
        format_type: '1vs1',
        winning_team: null,
        result_type: null
      });

      // Inyectamos los contrincantes asignándoles equipo 1 y equipo 2 para el versus
      await this.participantRepository.addParticipantsToBattle([
        { battle_id: newBattle.id, mc_id: mc1Id, team_number: 1, score: 0, performance_aka: null },
        { battle_id: newBattle.id, mc_id: mc2Id, team_number: 2, score: 0, performance_aka: null }
      ]);

      createdBattles.push(newBattle);
    }

    return createdBattles;
  }
}