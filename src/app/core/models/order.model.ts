import { IProduct } from "./product.model";

export type IOrdersRes = IOrder[];

export interface IOrder {
  shippingAddress: IOrderShippingAddres;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: IOrderUser;
  cartItems: IOrderProduct[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface IOrderShippingAddres {
	details: string;
	phone: string;
	city: string;
}

interface IOrderUser {
	_id: string;
	name: string;
	email: string;
	phone: string;
}

export interface IOrderProduct {
	count: number;
	_id: string;
	product: IProduct;
	price: number;
}