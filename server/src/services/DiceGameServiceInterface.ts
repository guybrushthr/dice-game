import { Game, PrismaClient } from '@prisma/client';
import {
	NewPlayerInterface,
	PlayerInterface,
} from '../services/DiceGameServicePlayerInterface';
import { GameInterface } from '../services/DiceGameServiceGameInterface';

export interface DiceGameServiceInterface {
	prisma: PrismaClient;
	getAllPlayers(): Promise<PlayerInterface[]>;

	createPlayer(player_name: string): Promise<PlayerInterface>;

	updatePlayer(
		player_id: number,
		player_newName: string
	): Promise<PlayerInterface>;

	createGame(player_id: number): Promise<Game>;
	updateGame(player_id: number): Promise<Game>;
	deleteGame(game_id: number): Promise<Game>;
	allRanking(): Promise<GameInterface[]>;
	loserRanking(): Promise<GameInterface[]>;
	winnerRanking(): Promise<GameInterface[]>;
}
