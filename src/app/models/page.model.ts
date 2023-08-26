import { Image } from './image.model';

export class Page {
  id!: number;
  page_number!: number;
  created_at!: string;
  updated_at!: string;
  interactions!: [];
  image!: Image;
  texts!: [];
}
