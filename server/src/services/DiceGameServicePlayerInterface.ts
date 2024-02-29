export interface PlayerInterface {
  player_id: number;
  player_name: string;
  createdAt: Date;
}

export interface NewPlayerInterface {
  player_name: string;
}

export interface AllPlayerRankingInterface {
  player_name: string;
  player_percentage: number;
  average_percentage: number;
}

export interface PlayerRankingInterface {
  player_name: string;
  player_percentage: number;
  average_percentage: number;
}
