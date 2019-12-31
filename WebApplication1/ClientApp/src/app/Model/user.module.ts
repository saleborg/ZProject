import { OrderDetail } from "./orderdetail.module";

export class User {
  isAdmin: boolean;
  name: string;
  userId: number;
  
  orderList: OrderList;
}


export interface OrderList {

  orderId: number;
  date: Date;
  orderDetailList: OrderDetail[];

}
