import { Game } from '@prisma/client';

export interface GameInterface {
	game_id: number;
	player_id: number;
}