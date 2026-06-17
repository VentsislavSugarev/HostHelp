export type TournamentStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED';

export interface Tournament {
  id: string;
  title: string;
  location: string;
  status: TournamentStatus;
  currentJornada: number;
  createdAt: Date;
}