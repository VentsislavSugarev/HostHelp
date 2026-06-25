export type BattleFormatType = '1vs1' | '2vs2' | '3vs3' | 'triple_traspies' | 'exhibition';

export interface Battle {
  id: string;
  event_id: string;
  stage: string;
  group_letter: string | null;
  battle_order: number;
  format_type: BattleFormatType;
  winning_team: string | null;
  created_at: string;
}