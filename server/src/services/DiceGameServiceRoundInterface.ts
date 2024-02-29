export interface RoundInterface {
  round_id: number;
  player_id: number;
}

export interface AllRoundsInterface {
  round_id: number;
  dice1: number;
  dice2: number;
  sum_dice: number;
  result: Boolean;
}
