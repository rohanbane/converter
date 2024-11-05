import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import dataSource from '../data-source';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         userid:
 *           type: string
 *           description: Auto-generated ID of the user
 *         username:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         userid: d5fE_asz
 *         username: John Doe
 *         email: john.doe@example.com
 *         password: password123
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Some server error
 */
const registerHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, email, password } = req.body;
  const userRepo = dataSource.getRepository(User);

  try {
    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepo.create({ username, email, passwordhash: hashedPassword });
    await userRepo.save(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *             example:
 *               email: john.doe@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Some server error
 */
const loginHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;
  const userRepo = dataSource.getRepository(User);

  try {
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordhash);
    if (!isValidPassword) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user.userid }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

// Use handlers for routes
router.post('/register', registerHandler);
router.post('/login', loginHandler);

export default router;
