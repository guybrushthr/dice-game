import { PrismaClient } from '@prisma/client';
import { DiceGameServiceInterface } from '../services/DiceGameServiceInterface';
import { PlayerInterface } from '../services/DiceGameServicePlayerInterface';

export const DiceGameService: DiceGameServiceInterface = {
	prisma: new PrismaClient(),
	async getAllPlayers() {
		const players = await this.prisma.player.findMany({
			select: {
				player_id: true,
				player_name: true,
			},
		});
		return players.map((player) => ({
			...player,
			createdAt: new Date(),
		}));
	},
};
