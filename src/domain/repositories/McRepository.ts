import { Mc } from '../models/Mc';

export interface McRepository {
  getAllMcs(): Promise<Mc[]>;
  getMcById(id: string): Promise<Mc | null>;
  saveMc(mc: Partial<Mc>): Promise<Mc>;
}