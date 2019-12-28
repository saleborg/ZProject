import { OrderDetail } from "./orderdetail.module";

export class Cart {

  orderDetails: OrderDetail[];

  constructor(od: OrderDetail[]) {
    this.orderDetails = od;
  }



}



export function getCart(od: OrderDetail[]): Cart {
  return new Cart(od);
};
