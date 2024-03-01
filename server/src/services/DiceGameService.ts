import { PrismaClient } from "@prisma/client";
import { DiceGameServiceInterface } from "../services/DiceGameServiceInterface";
import { PlayerInterface } from "./DiceGameServicePlayerInterface";
import { WinsAndLossesInterface } from "./DiceGameServiceRoundInterface";
import { playRound } from "./../game_logic";

export const DiceGameService: DiceGameServiceInterface = {
  prisma: new PrismaClient(),
  async getAllPlayers() {
    const allRoundsWithPercentage: WinsAndLossesInterface[] = await this.prisma
      .$queryRaw`
    SELECT
        player.player_name,
        ROUND((COUNT(CASE WHEN round.result = true THEN 1 END) / COUNT(*)) * 100, 2) AS win_percentage
        FROM Player player
        JOIN Round round ON player.player_id = round.player_id
        GROUP BY player.player_id;
    `;
    return allRoundsWithPercentage;
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

  async allRanking() {
    const allRounds: WinsAndLossesInterface[] = await this.prisma.$queryRaw`
    SELECT
        player.player_name,
        ROUND((COUNT(CASE WHEN round.result = true THEN 1 END) / COUNT(*)) * 100, 2) AS win_percentage
        FROM Player player
        JOIN Round round ON player.player_id = round.player_id
        GROUP BY player.player_id;
    `;

    const sortedAllRounds = allRounds.sort(
      (a, b) => a.win_percentage - b.win_percentage
    );

    const total: number = sortedAllRounds.reduce((acc, curr): number => {
      curr.win_percentage = Number(curr.win_percentage);
      acc += Number(curr.win_percentage);
      return acc;
    }, 0);
    const average = Number((total / sortedAllRounds.length).toFixed(2));
    sortedAllRounds.push({
      player_name: "All Players Average",
      win_percentage: average,
    });
    return sortedAllRounds;
  },

  async loserRanking() {
    const playerWorstPercentage: WinsAndLossesInterface = await this.prisma
      .$queryRaw`
    SELECT
        player.player_name,
        ROUND((COUNT(CASE WHEN round.result = true THEN 1 END) / COUNT(*)) * 100, 2) AS win_percentage
        FROM Player player
        JOIN Round round ON player.player_id = round.player_id
        GROUP BY player.player_id 
        ORDER BY win_percentage ASC 
        LIMIT 1;
    `;
    return playerWorstPercentage;
  },

  async winnerRanking() {
    const playerBestPercentage: WinsAndLossesInterface = await this.prisma
      .$queryRaw`
    SELECT
        player.player_name,
        ROUND((COUNT(CASE WHEN round.result = true THEN 1 END) / COUNT(*)) * 100, 2) AS win_percentage
        FROM Player player
        JOIN Round round ON player.player_id = round.player_id
        GROUP BY player.player_id 
        ORDER BY win_percentage DESC 
        LIMIT 1;
    `;
    return playerBestPercentage;
  },
};
