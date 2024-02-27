import { PrismaClient } from "@prisma/client";
import { DiceGameServiceInterface } from "../services/DiceGameServiceInterface";
import { PlayerInterface } from "./DiceGameServicePlayerInterface";

export const DiceGameService: DiceGameServiceInterface = {
  prisma: new PrismaClient(),
  async getAllPlayers() {
    const players = await this.prisma.player.findMany({
      select: {
        player_id: true,
        player_name: true,
        createdAt: true,
      },
    });
    return players.map((player) => ({
      ...player,
    }));
  },
  async createPlayer(name: string): Promise<PlayerInterface> {
    const playerInDatabase = await this.prisma.player.findFirst({
      where: {
        player_name: name,
      },
    });
    if (!playerInDatabase) {
      const newPlayer = await this.prisma.player.create({
        data: { player_name: name },
      });
      return newPlayer;
    } else {
      throw new Error(`Player with name ${name} already exists`);
    }
  },
  async updatePlayer(player_id: number, newName: string) {
    const updatedPlayer = await this.prisma.player.update({
      where: { player_id: player_id },
      data: { player_name: newName },
    });
    return updatedPlayer;
  },
};
