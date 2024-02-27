import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

async function addPlayer(name: string) {
  console.log("bro?");
  try {
    const player = await prisma.player.create({
      data: {
        player_name: name,
      },
    });
    console.log(player);
  } catch (error) {
    console.log(error);
  }
}

// prisma.$on("query", (e) => {
//   console.log(e);
//   console.log("Query: " + e.query);
//   console.log("Params: " + e.params);
//   console.log("Duration: " + e.duration + "ms");
// });

// async function lookUpAllPlayers() {
//   const players = await prisma.player.findMany();
//   console.log(players);
//   return players;
// }
async function modifyDB() {
  console.log()
  await addPlayer("Michael from updateDB.ts").catch((error) => {
    console.log("An error occurred in modifyDB: " + error);
  });
}

modifyDB();
