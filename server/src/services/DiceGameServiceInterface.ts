import { PrismaClient } from '@prisma/client';

export interface DiceGameServiceInterface {
	prisma: PrismaClient;
}