import { AppConfig } from '../models/Config';

export interface ConfigRepository {
  getConfig(): Promise<AppConfig | null>;
  updateConfig(config: Partial<AppConfig>): Promise<void>;
}