import { Request, Response } from 'express';
import { DiceGameService } from '../services/DiceGameService';
import {
	NewPlayerInterface,
	PlayerInterface,
} from '../services/DiceGameServicePlayerInterface';

export const DiceGameController = {
	getAllPlayers: async (_req: Request, res: Response) => {
		try {
			const allPlayers: PlayerInterface[] =
				await DiceGameService.getAllPlayers();
			return res.status(200).send(allPlayers);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).send({ error: error.message });
			}
		}
	},
	createPlayer: async (req: Request, res: Response) => {
		try {
			const newPlayerName: string = req.body.name;
			const newPlayer: PlayerInterface = await DiceGameService.createPlayer(
				newPlayerName
			);
			return res.status(201).send(newPlayer);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).send({ error: error.message });
			}
		}
	},
	updatePlayer: async (req: Request, res: Response) => {
		try {
			const idExistingPlayer: number = parseInt(req.params.id);
			const newName: string = req.body.name;
			const updatedPlayer: PlayerInterface = await DiceGameService.updatePlayer(
				idExistingPlayer,
				newName
			);
			return res.status(200).send(updatedPlayer);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).send({ error: error.message });
			}
		}
	},

	createGame: async (req: Request, res: Response) => {
		try {
			const idExistingPlayer: number = parseInt(req.params.id);
			const newGame = await DiceGameService.createGame(idExistingPlayer);
			return res.status(201).send(newGame);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).send({ error: error.message });
			}
		}
	},

	updateGame: async (req: Request, res: Response) => {
		try {
			const game_id: number = parseInt(req.params.id);
			const updatedGame = await DiceGameService.updateGame(game_id);
			return res.status(201).send(updatedGame);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).send({ error: error.message });
			}
		}
	},

	deleteGame: async (req: Request, res: Response) => {
		try {
			const game_id: number = parseInt(req.params.id);
			const deletedGame = await DiceGameService.deleteGame(game_id);
			return res.status(201).send(deletedGame);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).send({ error: error.message });
			}
		}
	},

	allRanking: async (_req: Request, res: Response) => {
		try {
			const ranking = await DiceGameService.allRanking();
			return res.status(200).send(ranking);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).send({ error: error.message });
			}
		}
	},

	loserRanking: async (_req: Request, res: Response) => {
		try {
			const ranking = await DiceGameService.loserRanking();
			return res.status(200).send(ranking);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).send({ error: error.message });
			}
		}
	},

	winnerRanking: async (_req: Request, res: Response) => {
		try {
			const ranking = await DiceGameService.winnerRanking();
			return res.status(200).send(ranking);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).send({ error: error.message });
			}
		}
	},
};
