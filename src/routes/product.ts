import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import dataSource from '../data-source';
import { Product } from '../entity/Product';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - image
 *         - summary
 *         - price
 *       properties:
 *         pid:
 *           type: string
 *           description: Auto-generated ID of the product
 *         title:
 *           type: string
 *           description: Product title
 *         image:
 *           type: string
 *           description: Product image URL
 *         summary:
 *           type: string
 *           description: Short summary of the product
 *         price:
 *           type: number
 *           format: float
 *           description: Product price
 *       example:
 *         pid: d5fE_asz
 *         title: Tent
 *         image: http://example.com/tent.png
 *         summary: A nice camping tent.
 *         price: 50.00
 */

/**
 * @swagger
 * /products/:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product added successfully
 *       500:
 *         description: Some server error
 */
const addProductHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, image, summary, price } = req.body;
  const productRepo = dataSource.getRepository(Product);

  try {
    const newProduct = productRepo.create({ title, image, summary, price });
    await productRepo.save(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /products/:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */
const getProductsHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const productRepo = dataSource.getRepository(Product);

  try {
    const products = await productRepo.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 */
const updateProductHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { title, image, summary, price } = req.body;
  const productRepo = dataSource.getRepository(Product);

  try {
    const product = await productRepo.findOneBy({ pid: id });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    product.title = title;
    product.image = image;
    product.summary = summary;
    product.price = price;
    await productRepo.save(product);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 */
const deleteProductHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const productRepo = dataSource.getRepository(Product);

  try {
    const product = await productRepo.findOneBy({ pid: id });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    await productRepo.remove(product);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Use handlers for routes
router.post('/', addProductHandler);
router.get('/', getProductsHandler);
router.put('/:id', updateProductHandler);
router.delete('/:id', deleteProductHandler);

export default router;
