import { PrismaClient } from '@prisma/client';
import { DiceGameServiceInterface } from '../services/DiceGameServiceInterface';
import { PlayerInterface } from './DiceGameServicePlayerInterface';
import { GameInterface } from './DiceGameServiceGameInterface';

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

	async createGame(idExistingPlayer: number) {
		const newGame = await this.prisma.game.create({
			data: {
				player_id: idExistingPlayer,
			},
		});
		return newGame;
	},

	async updateGame(player_id: number): Promise<GameInterface> {
		const updatedGame = await this.prisma.game.update({
			where: { game_id: player_id },
			data: { game_id: player_id },
		});
		return updatedGame;
	},

	deleteGame(game_id: number) {
		return this.prisma.game.delete({
			where: { game_id: game_id },
		});
	},

	allRanking() {
		return this.prisma.game.findMany({
			select: {
				game_id: true,
				player_id: true,
			},
		});
	},

	loserRanking() {
		return this.prisma.game.findMany({
			where: {
				game_id: {
					lt: 3,
				},
			},
			select: {
				game_id: true,
				player_id: true,
			},
		});
	},

	winnerRanking() {
		return this.prisma.game.findMany({
			where: {
				game_id: {
					gt: 2,
				},
			},
			select: {
				game_id: true,
				player_id: true,
			},
		});
	}
};
