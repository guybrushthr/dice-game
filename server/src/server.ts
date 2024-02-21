import express from 'express';
import { PrismaClient } from 'node_modules/.prisma/client/default';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Create a new Player
app.post('/players', async (req, res) => {
	const { name } = req.body;
	try {
		const player = await prisma.player.create({
			data: {
				player_name: name,
			},
		});
		res.json(player);
	} catch (error) {
		res.status(500).json({ error: 'Failed to create player' });
	}
});

app.listen(3000, () => console.log('Server is on port', 3000));

