import { PrismaClient } from '@prisma/client';
import { DiceGameServiceInterface } from '../services/DiceGameServiceInterface';
import { PlayerInterface } from '../services/DiceGameServicePlayerInterface';

export const DiceGameService: DiceGameServiceInterface = {
	prisma: new PrismaClient(),
	// 
	// 
	// 
};
