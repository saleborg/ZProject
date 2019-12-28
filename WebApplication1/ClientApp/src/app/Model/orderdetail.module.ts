import { Product } from "./product.module";

export class OrderDetail {

  product: Product;

  price: number;
  units: number;


  constructor(product: Product, price: number, units: number) {
    this.price = price;
    this.units = units;
    this.product = product;
  }

}
export function getOrderDetail(product: Product, price: number, units: number): OrderDetail {
  return new OrderDetail(product, price, units);
};
