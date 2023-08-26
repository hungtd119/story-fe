import { Image } from './image.model';
import { Page } from './page.model';

export class Story {
  id!: number;
  title!: string;
  author!: string;
  illustrator!: string;
  level!: string;
  coin!: number;
  created_at!: string;
  updated_at!: string;
  image!: Image;
  page!: Page[];

  constructor(
    id: number,
    title: string,
    illustrator: string,
    level: string,
    coin: number,
    created_at: string,
    updated_at: string,
    image: Image
  ) {
    this.id = id;
    this.title = title;
    this.illustrator = illustrator;
    this.level = level;
    this.coin = coin;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.image = image;
  }
}
