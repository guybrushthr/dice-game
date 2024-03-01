export interface AllRoundsInterface {
  round_id: number;
  dice1: number;
  dice2: number;
  sum_dice: number;
  result: Boolean;
}

export interface WinsAndLossesInterface {
  player_name: string;
  win_percentage: number;
}
