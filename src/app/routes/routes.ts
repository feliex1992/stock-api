import { Router } from 'express';
import ProductController from '../controllers/productController';
import { ProductUseCase } from '../use-cases/ProductUseCase';
import { Database } from '../../infrastructure/database';
import { ProductRepository } from '../repositories/ProductRepository';
import { UserRepository } from '../repositories/UserRepository';
import { AuthUseCase } from '../use-cases/AuthUseCase';
import { UserController } from '../controllers/UserController';
import { authenticateToken } from '../utils/authenticateToken';

const router = Router();

const userRepository = new UserRepository();
const authUseCase = new AuthUseCase(userRepository);
const userController = new UserController(authUseCase);

const productRepository = new ProductRepository();
const productUseCase = new ProductUseCase(productRepository);
const productController = new ProductController(productUseCase);

router.post('/login', (req, res) => userController.logIn(req, res));
router.post('/login-by-phone', (req, res) => userController.logInByNoPhone(req, res));
router.post('/verify-otp', (req, res) => userController.verifyOTPLogin(req, res));
router.post('/register', (req, res) => userController.register(req, res));
router.post('/products', (req, res, next) => authenticateToken(req, res, next),
  (req, res) => productController.createProduct(req, res));
router.get('/products', (req, res, next) => authenticateToken(req, res, next),
  (req, res) => productController.stockReport(req, res));

export default router;