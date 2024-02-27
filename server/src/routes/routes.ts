import { Router } from "express";

import { DiceGameController } from "../controllers/DiceGameController";

export const diceGameRouter = Router();

diceGameRouter.post("/players", DiceGameController.createPlayer);
diceGameRouter.get("/players", DiceGameController.getAllPlayers);
// diceGameRouter.put('/players/:id', diceGameController.updatePlayer);

// diceGameRouter.post('/games/:id', diceGameController.createGame);
// diceGameRouter.put('/games/:id', diceGameController.updateGame);
// diceGameRouter.delete('/games/:id', diceGameController.deleteGame);

// diceGameRouter.get('/ranking', diceGameController.allRanking);
// diceGameRouter.get('/ranking/loser', diceGameController.loserRanking);
// diceGameRouter.get('/ranking/winner', diceGameController.winnerRanking);
