import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import listRoutes from './routes/listRoutes'
import { connectToDatabase } from './config/database'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use('/api', listRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));