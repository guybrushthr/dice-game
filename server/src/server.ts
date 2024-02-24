import express from 'express';
import { diceGameRouter } from './routes/routes';

const app = express();
app.use(express.json());

app.use('/api', diceGameRouter);

app.listen(3000, () => console.log('Server is on port', 3000));
