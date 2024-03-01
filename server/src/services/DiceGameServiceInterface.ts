import { Round, PrismaClient } from "@prisma/client";
import { PlayerInterface } from "../services/DiceGameServicePlayerInterface";
import {
  AllRoundsInterface,
  WinsAndLossesInterface,
} from "./DiceGameServiceRoundInterface";

export interface DiceGameServiceInterface {
  prisma: PrismaClient;
  getAllPlayers(): Promise<WinsAndLossesInterface[]>;
  createPlayer(player_name: string): Promise<PlayerInterface>;
  updatePlayer(
    player_id: number,
    player_newName: string
  ): Promise<PlayerInterface>;

  playRound(player_id: number): Promise<Round>;
  deleteRounds(player_id: number): Promise<number>;
  listRounds(player_id: number): Promise<AllRoundsInterface[]>;

  allRanking(): Promise<WinsAndLossesInterface[]>;
  loserRanking(): Promise<WinsAndLossesInterface>;
  winnerRanking(): Promise<WinsAndLossesInterface>;
}
