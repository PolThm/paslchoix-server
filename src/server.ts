import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import listRoutes from './routes/listRoutes'
import userRoutes from './routes/userRoutes'
import { connectToDatabase } from './config/database'
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const urlencodedParser = express.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use('/api', listRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));