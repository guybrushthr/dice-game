import { Game } from "@prisma/client";

export interface PlayerInterface {
  player_id: number;
  player_name: string;
  createdAt: Date;
}

export interface NewPlayerInterface {
  player_name: string;
}
