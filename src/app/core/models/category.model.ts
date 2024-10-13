export interface ICategoriesRes {
  results: number;
  metadata: Metadata;
  data: ICategory[];
}

export interface ICategory {
	_id: string;
	name: string;
	slug: string;
	image: string;
	createdAt?: string;
	updatedAt?: string;
}

interface Metadata {
	currentPage: number;
	numberOfPages: number;
	limit: number;
}
