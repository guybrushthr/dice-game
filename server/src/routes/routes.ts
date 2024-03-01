import { Router } from "express";

import { DiceGameController } from "../controllers/DiceGameController";

export const diceGameRouter = Router();

diceGameRouter.post("/players", DiceGameController.createPlayer);
diceGameRouter.get("/players", DiceGameController.getAllPlayers); // all players with success percentage
diceGameRouter.put("/players/:id", DiceGameController.updatePlayer); //change name of existing player

diceGameRouter.post("/games/:id", DiceGameController.playRound); // specific user plays round
diceGameRouter.delete("/games/:id", DiceGameController.deleteRounds);
diceGameRouter.get("/games/:id", DiceGameController.listRounds);

diceGameRouter.get("/ranking", DiceGameController.allRanking); //
diceGameRouter.get("/ranking/loser", DiceGameController.loserRanking);
diceGameRouter.get("/ranking/winner", DiceGameController.winnerRanking);
