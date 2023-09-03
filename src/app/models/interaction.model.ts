import { Image } from './image.model';
import { Position } from './position.model';
import { Text } from './text.model';

export class Interaction {
  id!: number;
  bg!: string;
  blink!: string;
  created_at!: string;
  updated_at!: string;
  positions!: Position[];
  image!: Image;
  text!: Text;
}
