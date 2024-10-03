import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import userRoutes from './routes/users';
import dotenv from "dotenv";
import {authenticateKey} from './middleware/auth.middleware';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001; // Default to 3001 if .env is missing or PORT is not set

const app: Application = express();

app.use(morgan("tiny"));

// Use user routes
app.use('/api/v1/users', userRoutes);

app.get("/ping", async (_req: Request, res: Response) => {
    res.send({
        message: "hello from helllllo",
    });
});

app.get('/bananas', async (_req: Request, res: Response) => {
    res.send('hello world, this is bananas');
});

app.listen(PORT, () => {
    if (process.env.PORT) {
        console.log(`Server is running on port ${process.env.PORT} from .env file`);
    } else {
        console.log(`Server is running on default port ${PORT} (No .env file found)`);
    }
});

app.use('/api/v1/users', authenticateKey, userRoutes)

console.log("PORT from .env:", process.env.PORT);

