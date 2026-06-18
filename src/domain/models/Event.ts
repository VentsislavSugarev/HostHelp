export type EventStatus = 'draft' | 'published' | 'active' | 'finished';

export interface Event {
  id: string;
  organization_id: string;
  title: string;
  date: string;
  location: string | null;
  status: EventStatus;
  created_at: string;
}