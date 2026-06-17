export type EventStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED';

export interface Event {
  id: string;
  title: string;
  location: string | null;
  status: EventStatus;
  date: string;
  createdAt: Date;
}