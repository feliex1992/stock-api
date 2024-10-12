import { Product } from "../../domain/entities/Product";
import { CreateProductDTO } from "../dtos/CreateProductDTO";
import { ProductRepository } from "../repositories/ProductRepository";

export class ProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const { product_name, category_id, qty, price } = createProductDTO;

    const product: Product = { product_name: product_name, category_id: category_id, qty: qty, price: price };
    const createdProduct = await this.productRepository.create(product);
    return createdProduct;
  }

  public async stockReport(): Promise<Product[]> {
    return await this.productRepository.stockReport();
  }
}