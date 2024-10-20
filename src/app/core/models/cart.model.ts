import { IProduct } from "./product.model";

export interface ICartProduct {
	count: number;
	_id: string;
	product: IProduct;
	price: number;
}

export interface ICartData {
	_id: string;
	cartOwner: string;
	products: ICartProduct[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	totalCartPrice: number;
}

export interface ICartRes {
	status: string;
	numOfCartItems: number;
	cartId?: string;
	data: ICartData;
}