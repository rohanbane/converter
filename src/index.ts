import 'reflect-metadata';
import express from 'express';
import dataSource from './data-source';
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
// import rentalRoutes from './routes/rental';
import healthRoutes from './routes/health';
import setupSwagger from '../swagger'; // Import Swagger setup
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const port = 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
// app.use('/rentals', rentalRoutes);
app.use('/health', healthRoutes);

setupSwagger(app); // Setup Swagger

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

dataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(error => console.log(error));

