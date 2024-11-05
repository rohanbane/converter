import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns the health status of the application
 *     responses:
 *       200:
 *         description: Application is healthy
 */
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

export default router;
