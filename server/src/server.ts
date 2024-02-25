import express from 'express';
import { diceGameRouter } from './routes/routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', diceGameRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
