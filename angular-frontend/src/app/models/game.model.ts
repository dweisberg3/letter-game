export interface GameRecord {
  id: number;
  username: string;
  points: number;
  letter_level: number;
  selected_sections_index: number;
  is_cumulative: boolean;
  one_letter_game_with_miss: boolean;
  timestamp: string;
}

export interface GameParams {
  username: string;
  points: number;
  letter_level: number;
  selected_sections_index: number;
  is_cumulative: boolean;
  lost_single_letter_game: boolean;
}
