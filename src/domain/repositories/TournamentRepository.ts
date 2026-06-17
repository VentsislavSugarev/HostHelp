import { Tournament } from '../models/Tournament';

export interface TournamentRepository {
  getAllTournaments(): Promise<Tournament[]>;
  getTournamentById(id: string): Promise<Tournament | null>;
  createTournament(tournament: Partial<Tournament>): Promise<Tournament>;
  updateTournamentStatus(id: string, status: Tournament['status']): Promise<void>;
  updateTournamentJornada(id: string, jornada: number): Promise<void>;
}