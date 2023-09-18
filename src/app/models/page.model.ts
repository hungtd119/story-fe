import { Image } from './image.model';
import { Interaction } from './interaction.model';
import { Text } from './text.model';

export class Page {
  id!: number;
  page_number!: number;
  created_at!: string;
  updated_at!: string;
  interactions!: Interaction[];
  width_device!: number;
  height_device!: number;
  image!: Image;
  texts!: Text[];
  image_id!: number;
  interactions_count!: number;
}
