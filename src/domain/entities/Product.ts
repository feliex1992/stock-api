import { Category } from "./Category";

export interface Product {
  id?: number;
  product_name: string;
  category_id?: number;
  category?: Category;
  qty?: number;
  price?: number; 
}
