import { PrismaClient } from '@prisma/client';
import { PlayerInterface } from '../services/DiceGameServicePlayerInterface';

export interface DiceGameServiceInterface {
	prisma: PrismaClient;
	getAllPlayers(): Promise<PlayerInterface[]>;
}
