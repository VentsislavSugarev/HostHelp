export type BattleFormatType = '1vs1' | '2vs2' | '3vs3' | 'triple_traspies' | 'exhibicion';
export type BattleResultType = 'directo' | 'replica' | '2_replicas' | 'walkover';

export interface Battle {
  id: string;
  event_id: string;
  stage: string;
  group_letter: string | null;
  battle_order: number;
  format_type: BattleFormatType;
  winning_team: string | null;
  result_type: BattleResultType | null;
  created_at: string;
}