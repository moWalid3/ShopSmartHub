import { Metadata } from "./metaData.model";

export interface IBrand {
	_id: string;
	name: string;
	slug: string;
	image: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface IBrandsRes {
	results: number;
	metadata: Metadata;
	data: IBrand[];
}