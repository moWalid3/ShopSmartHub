import { IProduct } from "./product.model";

export interface IWishlistRes {
  data: IProduct[],
  status: string,
  count: number,
}

export interface IAddToWishlistRes {
  data: string[],
  status: string,
  message: string,
}