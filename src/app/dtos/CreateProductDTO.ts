import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'Product name is required' })
  product_name: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsNumber()
  @Min(0, { message: 'Qty must be a positive number!'})
  qty: number;

  @IsNumber()
  @Min(0, { message: 'Price must be a positive number!'})
  price: number;
}
