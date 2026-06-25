import { Mc } from '../models/Mc';

export interface McRepository {
  getMcs(): Promise<Mc[]>;
  getMcById(id: string): Promise<Mc | null>;
  saveMc(mc: Partial<Mc>): Promise<Mc>;
  updateMc(id: string, mc: Partial<Mc>): Promise<Mc>;
  deleteMc(id: string): Promise<void>;
}