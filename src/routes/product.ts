import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import dataSource from '../data-source';
import { Product } from '../entity/Product';

const router = Router();

// Add a new product
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

// Get all products
const getProductsHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const productRepo = dataSource.getRepository(Product);

  try {
    const products = await productRepo.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Update a product
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

// Delete a product
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
