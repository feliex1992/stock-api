import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateProductDTO } from '../dtos/CreateProductDTO';
import { ProductUseCase } from '../use-cases/ProductUseCase';

export default class ProductController {
  private productUseCase: ProductUseCase;

  constructor(productUseCase: ProductUseCase) {
    this.productUseCase = productUseCase;
  }

  public async createProduct(req: Request, res: Response): Promise<any> {
    const createProductDTO = plainToInstance(CreateProductDTO, req.body);

    const errors = await validate(createProductDTO);
    if (errors.length > 0) {
      return res.status(400).json({ errors});
    }

    try {
      const result = await this.productUseCase.createProduct(createProductDTO);
      res.status(201).json(result);
    } catch(e: any) {
      if (typeof e === 'string') {
        return res.status(400).json({
          error: {
            message: e
          }
        });
      } else {
        return res.status(400).json(e);
      }
    }
  }

  public async stockReport(req: Request, res: Response): Promise<any> {
    try {
      const result = await this.productUseCase.stockReport();
      res.status(201).json(result);
    } catch(e: any) {
      if (typeof e === 'string') {
        return res.status(400).json({
          error: {
            message: e
          }
        });
      } else {
        return res.status(400).json(e);
      }
    }
  }
}
