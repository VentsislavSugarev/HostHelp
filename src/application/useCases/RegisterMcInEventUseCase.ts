import { BattleParticipantRepository } from '../../domain/repositories/BattleParticipantRepository';
import { McRepository } from '../../domain/repositories/McRepository';
import { BattleParticipant } from '../../domain/models/BattleParticipant';

export class RegisterMcInEventUseCase {
  constructor(
    private mcRepository: McRepository,
    private participantRepository: BattleParticipantRepository
  ) {}

  async execute(mcId: string, battleId: string): Promise<BattleParticipant> {
    const mc = await this.mcRepository.getMcById(mcId);
    if (!mc) {
      throw new Error('The MC you are trying to register does not exist.');
    }

    const currentParticipants = await this.participantRepository.getParticipantsByBattleId(battleId);
    const isAlreadyAdded = currentParticipants.some(p => p.mcId === mcId);
    
    if (isAlreadyAdded) {
      throw new Error('This MC is already registered in the selected battle.');
    }

    const [newParticipant] = await this.participantRepository.addParticipantsToBattle([
      { battleId, mcId }
    ]);

    return newParticipant;
  }
}