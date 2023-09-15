export class Position {
  id!: number;
  position_x!: number;
  position_y!: number;
  width!: number;
  height!: number;
  isDragging: number;
  isResizing!: number;
  resizeDirect!: string;
  dragStartX!: number;
  dragStartY!: number;
  created_at!: string;
  updated_at!: string;
  constructor(
    isDragging: number = 0,
    isResizing: number = 0,
    resizeDirect: string = 'o',
    dragStartX: number = 0,
    dragStartY: number = 0,
    created_at: string = Date.now().toString(),
    updated_at: string = Date.now().toString()
  ) {
    this.isDragging = isDragging;
    this.isResizing = isResizing;
    this.resizeDirect = resizeDirect;
    this.dragStartX = dragStartX;
    this.dragStartY = dragStartY;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
