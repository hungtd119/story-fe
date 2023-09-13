export class Position {
  id!: number;
  position_x!: number;
  position_y!: number;
  width!: number;
  height!: number;
  isDragging!: boolean;
  isResizing!: boolean;
  resizeDirect!: string;
  dragStartX!: number;
  dragStartY!: number;
  created_at!: string;
  updated_at!: string;
  constructor(
    id: number = Math.floor(Math.random() * 90000) + 10000,
    isDragging: boolean = false,
    isResizing: boolean = false,
    resizeDirect: string = '',
    dragStartX: number = 0,
    dragStartY: number = 0,
    created_at: string = Date.now().toString(),
    updated_at: string = Date.now().toString()
  ) {
    this.id = id;
    this.isDragging = isDragging;
    this.isResizing = isResizing;
    this.resizeDirect = resizeDirect;
    this.dragStartX = dragStartX;
    this.dragStartY = dragStartY;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
