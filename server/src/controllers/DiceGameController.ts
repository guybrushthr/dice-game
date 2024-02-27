import { Request, Response } from "express";
import { DiceGameService } from "../services/DiceGameService";
import {
  NewPlayerInterface,
  PlayerInterface,
} from "../services/DiceGameServicePlayerInterface";

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
      const newPlayer = await DiceGameService.createPlayer(newPlayerName);
      return res.status(201).send(newPlayer);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message });
      }
    }
  },
};
