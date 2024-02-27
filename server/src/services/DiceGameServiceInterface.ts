import { PrismaClient } from "@prisma/client";
import {
  NewPlayerInterface,
  PlayerInterface,
} from "../services/DiceGameServicePlayerInterface";

export interface DiceGameServiceInterface {
  prisma: PrismaClient;
  getAllPlayers(): Promise<PlayerInterface[]>;
  createPlayer(player_name: string): Promise<NewPlayerInterface>;
}
