import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import dotenv from 'dotenv'

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

dotenv.config("./.env.development")

// app.use('/api', urlRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
