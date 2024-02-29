import { Round, PrismaClient } from "@prisma/client";
import {
  NewPlayerInterface,
  PlayerInterface,
} from "../services/DiceGameServicePlayerInterface";
import {
  AllRoundsInterface,
  RoundInterface,
} from "./DiceGameServiceRoundInterface";

export interface DiceGameServiceInterface {
  prisma: PrismaClient;
  getAllPlayers(): Promise<PlayerInterface[]>;

  createPlayer(player_name: string): Promise<PlayerInterface>;

  updatePlayer(
    player_id: number,
    player_newName: string
  ): Promise<PlayerInterface>;

  playRound(player_id: number): Promise<Round>;
  deleteRounds(player_id: number): Promise<number>;
  listRounds(player_id: number): Promise<AllRoundsInterface[]>;
  allRanking(): Promise<RoundInterface[]>;
  loserRanking(): Promise<RoundInterface[]>;
  winnerRanking(): Promise<RoundInterface[]>;
}
