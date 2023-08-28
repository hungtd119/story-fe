import { Position } from './position.model';

export class Text {
  id!: number;
  text!: string;
  icon!: string;
  wordSync!: string;
  created_at!: string;
  updated_at!: string;
  audio!: object;
  position!: Position;
}
