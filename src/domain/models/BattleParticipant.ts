export interface BattleParticipant {
  id: string;
  battle_id: string;
  mc_id: string;
  team_number: number;
  performance_aka: string | null;
  score: number | null;
}