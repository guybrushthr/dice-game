import { PrismaClient } from "@prisma/client";
import { DiceGameServiceInterface } from "../services/DiceGameServiceInterface";

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
      createdAt: new Date(),
    }));
  },
  async createPlayer(name: string) {
    const playerInDatabase = await this.prisma.player.findFirst({
      where: {
        player_name: name,
      },
    });
    if (!playerInDatabase) {
      const newPlayer = await this.prisma.player.create({
        data: { player_name: name },
      });
      return { player_name: newPlayer.player_name };
    } else {
      throw new Error(`Player with name ${name} already exists`);
    }
  },
};
