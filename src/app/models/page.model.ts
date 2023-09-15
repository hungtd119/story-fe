import { Image } from './image.model';
import { Interaction } from './interaction.model';
import { Text } from './text.model';

export class Page {
  id!: number;
  page_number!: number;
  created_at!: string;
  updated_at!: string;
  interactions!: Interaction[];
  image!: Image;
  texts!: Text[];
  image_id!: number;
  interactions_count!: number;
}
