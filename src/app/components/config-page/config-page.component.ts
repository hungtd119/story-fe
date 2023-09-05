import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss'],
  standalone: true,
})
export class ConfigPageComponent implements AfterViewInit, OnInit {
  @ViewChild('bg', { static: true })
  canvasBgRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('interact', { static: true })
  canvasInteractRef!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;
  ctxInteract!: CanvasRenderingContext2D;

  rect = {
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    rectX: 50,
    rectY: 50,
    rectWidth: 50,
    rectHeight: 50,
  };

  ngOnInit(): void {
    this.ctx = this.canvasBgRef.nativeElement.getContext('2d')!;
    this.ctxInteract = this.canvasInteractRef.nativeElement.getContext('2d')!;
  }
  ngAfterViewInit(): void {
    const image = new Image();
    image.src =
      'https://firebasestorage.googleapis.com/v0/b/monkey-22059.appspot.com/o/Lg4oU6Aq4DxsWdwLByyCax1672904703767_trong.png?alt=media&token=bd7d5bc4-6ed3-4939-9336-af7f38a31a5b';
    image.onload = () => {
      this.ctx.drawImage(
        image,
        0,
        0,
        this.canvasBgRef.nativeElement.width,
        this.canvasBgRef.nativeElement.height
      );
      this.ctxInteract.fillStyle = 'red';
      this.ctxInteract.fillRect(
        this.rect.rectX,
        this.rect.rectY,
        this.rect.rectWidth,
        this.rect.rectHeight
      );
    };
  }
  onMouseUp() {
    this.rect.isDragging = false;
    console.log('move up');
  }
  onMouseDown(event: MouseEvent) {
    const rect = this.canvasInteractRef.nativeElement.getBoundingClientRect(); // chỉ số của khung canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
      mouseX >= this.rect.rectX &&
      mouseX <= this.rect.rectX + this.rect.rectWidth &&
      mouseY >= this.rect.rectY &&
      mouseY <= this.rect.rectY + this.rect.rectHeight
    ) {
      this.rect.isDragging = true;
      this.rect.dragStartX = mouseX;
      this.rect.dragStartY = mouseY;
    }
  }
  onMouseMove(event: MouseEvent) {
    if (this.rect.isDragging) {
      const rect = this.canvasInteractRef.nativeElement.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // khoảng cách chuột đã di chuyển
      const deltaX = mouseX - this.rect.dragStartX;
      const deltaY = mouseY - this.rect.dragStartY;

      this.rect.rectX += deltaX;
      this.rect.rectY += deltaY;

      this.reDrawCanvas();

      this.rect.dragStartX = mouseX;
      this.rect.dragStartY = mouseY;
    }
  }
  reDrawCanvas() {
    this.ctxInteract.clearRect(
      0,
      0,
      this.canvasInteractRef.nativeElement.width,
      this.canvasInteractRef.nativeElement.height
    );
    this.ctxInteract.fillStyle = 'red';
    this.ctxInteract.fillRect(
      this.rect.rectX,
      this.rect.rectY,
      this.rect.rectWidth,
      this.rect.rectHeight
    );
  }
}
