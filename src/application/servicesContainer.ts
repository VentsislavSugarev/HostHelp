import { SupabaseEventRepository } from '../infrastructure/repositories/supabase/SupabaseEventRepository';
import { SupabaseMcRepository } from '../infrastructure/repositories/supabase/SupabaseMcRepository';
import { SupabaseBattleRepository } from '../infrastructure/repositories/supabase/SupabaseBattleRepository';
import { SupabaseBattleParticipantRepository } from '../infrastructure/repositories/supabase/SupabaseBattleParticipantRepository';
import { SupabaseRoundRepository } from '../infrastructure/repositories/supabase/SupabaseRoundRepository';
import { SupabaseVoteRepository } from '../infrastructure/repositories/supabase/SupabaseVoteRepository';
import { SupabaseConfigRepository } from '../infrastructure/repositories/supabase/SupabaseConfigRepository';

import { CreateEventUseCase } from './useCases/CreateEventUseCase';
import { RegisterMcInEventUseCase } from './useCases/RegisterMcInEventUseCase';
import { GenerateInitialPairsUseCase } from './useCases/GenerateInitialPairsUseCase';
import { ResolveBattleWinnerUseCase } from './useCases/ResolveBattleWinnerUseCase';

const eventRepository = new SupabaseEventRepository();
const mcRepository = new SupabaseMcRepository();
const battleRepository = new SupabaseBattleRepository();
const participantRepository = new SupabaseBattleParticipantRepository();
const roundRepository = new SupabaseRoundRepository();
const voteRepository = new SupabaseVoteRepository();
const configRepository = new SupabaseConfigRepository();

export const createEventUseCase = new CreateEventUseCase(eventRepository);

export const registerMcInEventUseCase = new RegisterMcInEventUseCase(
  mcRepository,
  participantRepository
);

export const generateInitialPairsUseCase = new GenerateInitialPairsUseCase(
  battleRepository,
  participantRepository
);

export const resolveBattleWinnerUseCase = new ResolveBattleWinnerUseCase(battleRepository);

export {
  eventRepository,
  mcRepository,
  battleRepository,
  participantRepository,
  roundRepository,
  voteRepository,
  configRepository
};