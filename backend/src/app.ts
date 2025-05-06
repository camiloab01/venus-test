import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './config/db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8181;

// Middleware
app.use(cors());
app.use(express.json());

const testDbConnection = async () => {
  try {
    const connection = await db().getConnection();
    connection.release();
    return 'Database connection established successfully';
  } catch (error) {
    return `Error connecting to database: ${error}`;
  }
};

app.get('/', async (req: Request, res: Response) => {
  const response = await testDbConnection();
  res.json({ response });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
