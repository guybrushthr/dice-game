import { PrismaClient } from "@prisma/client";
import { DiceGameServiceInterface } from "../services/DiceGameServiceInterface";
import { PlayerInterface } from "./DiceGameServicePlayerInterface";
import { RoundInterface } from "./DiceGameServiceRoundInterface";
import { playRound } from "./../game_logic";

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

  async playRound(idExistingPlayer: number) {
    const newRound = playRound();
    const playedRound = await this.prisma.round.create({
      data: {
        player_id: idExistingPlayer,
        dice1: newRound.dice1,
        dice2: newRound.dice2,
        sum_dice: newRound.sum_dice,
        result: newRound.result,
      },
    });
    return playedRound;
  },

  async listRounds(player_id: number) {
    const allRounds = await this.prisma.round.findMany({
      where: {
        player_id: player_id,
      },
      select: {
        round_id: true,
        dice1: true,
        dice2: true,
        sum_dice: true,
        result: true,
      },
    });
    return allRounds;
  },

  async deleteRounds(player_id: number) {
    const deleteResult = await this.prisma.round.deleteMany({
      where: { player_id: player_id },
    });
    return deleteResult.count;
  },

  allRanking() {
    return this.prisma.round.findMany({
      select: {
        round_id: true,
        player_id: true,
      },
    });
  },

  loserRanking() {
    return this.prisma.round.findMany({
      where: {
        round_id: {
          lt: 3,
        },
      },
      select: {
        round_id: true,
        player_id: true,
      },
    });
  },

  winnerRanking() {
    return this.prisma.round.findMany({
      where: {
        round_id: {
          gt: 2,
        },
      },
      select: {
        round_id: true,
        player_id: true,
      },
    });
  },
};
