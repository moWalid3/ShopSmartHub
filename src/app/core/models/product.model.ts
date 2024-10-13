import { IBrand } from "./brand.model";
import { ICategory } from "./category.model";
import { Metadata } from "./metaData.model";

export interface IProductsRes {
  results: number;
  metadata: Metadata;
  data: IProduct[];
}

export interface IProduct {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Subcategory {
	_id: string;
	name: string;
	slug: string;
	category: string;
}