import { AppConfig } from '../../../domain/models/Config';
import { ConfigRepository } from '../../../domain/repositories/ConfigRepository';

export class SupabaseConfigRepository implements ConfigRepository {
  async getConfig(): Promise<AppConfig | null> {
    return {
      id: 'local-static-config',
      enableCountdownBeep: true,
      defaultFormat: 'DIRECT_VOTE',
      darkMode: false
    };
  }

  async updateConfig(config: Partial<AppConfig>): Promise<void> {
    return Promise.resolve();
  }
}