import { MatSelectModule } from '@angular/material/select';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    CommonModule,
    MatToolbarModule,
    FormsModule,
  ],
})
export class ConfigPageComponent implements AfterViewInit, OnInit {
  @ViewChild('bg', { static: true })
  canvasBgRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('interact', { static: true })
  canvasInteractRef!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;
  ctxInteract!: CanvasRenderingContext2D;

  isEResize = false;
  isNResize = false;
  isDrag = false;

  stroke = 3;

  interactions = [
    {
      bg: 'red',
      text: { text: 'Boy' },
      positions: [
        {
          isDragging: false,
          isResizing: false,
          resizeDirect: '',
          dragStartX: 0,
          dragStartY: 0,
          rectX: 50,
          rectY: 50,
          rectWidth: 50,
          rectHeight: 50,
        },
      ],
    },
    {
      bg: 'yellow',
      text: { text: 'Salad Bowl' },
      positions: [
        {
          isDragging: false,
          isResizing: false,
          resizeDirect: '',
          dragStartX: 0,
          dragStartY: 0,
          rectX: 200,
          rectY: 200,
          rectWidth: 50,
          rectHeight: 50,
        },
        {
          isDragging: false,
          isResizing: false,
          resizeDirect: '',
          dragStartX: 0,
          dragStartY: 0,
          rectX: 400,
          rectY: 500,
          rectWidth: 50,
          rectHeight: 50,
        },
      ],
    },
    {
      text: { text: 'Girl' },
      bg: 'brown',
      positions: [
        {
          isDragging: false,
          isResizing: false,
          resizeDirect: '',
          dragStartX: 0,
          dragStartY: 0,
          rectX: 300,
          rectY: 300,
          rectWidth: 50,
          rectHeight: 50,
        },
      ],
    },
  ];

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
      this.drawPositionOfInteractions();
    };
  }
  handleClickSavePosition() {
    console.log(this.interactions);
  }
  onMouseUp() {
    this.interactions.filter((interaction) => {
      interaction.positions.filter((position) => {
        position.isDragging = false;
        position.isResizing = false;
      });
    });
  }
  onMouseDown(event: MouseEvent) {
    const rect = this.canvasInteractRef.nativeElement.getBoundingClientRect(); // chỉ số của khung canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.interactions.filter((interaction) => {
      interaction.positions.filter((position) => {
        if (
          mouseX >= position.rectX + this.stroke &&
          mouseX <= position.rectX + position.rectWidth - this.stroke &&
          mouseY >= position.rectY + this.stroke &&
          mouseY <= position.rectY + position.rectHeight - this.stroke
        ) {
          position.isDragging = true;
          position.isResizing = false;
          position.dragStartX = mouseX;
          position.dragStartY = mouseY;
        }
        if (
          mouseX >= position.rectX &&
          mouseX <= position.rectX + position.rectWidth &&
          mouseY >= position.rectY &&
          mouseY <= position.rectY + position.rectHeight
        ) {
          const offsetX = mouseX - position.rectX;
          const offsetY = mouseY - position.rectY;

          const borderSize = 4;

          if (
            offsetX >= position.rectWidth - borderSize &&
            offsetX <= position.rectWidth
          ) {
            position.isDragging = false;
            position.isResizing = true;
            position.resizeDirect = 'r';
          }

          if (
            offsetY >= position.rectHeight - borderSize &&
            offsetY <= position.rectHeight
          ) {
            position.isDragging = false;
            position.isResizing = true;
            position.resizeDirect = 'b';
          }
        }
      });
    });
  }
  onMouseMove(event: MouseEvent) {
    this.isDrag = false;
    this.isEResize = false;
    this.isNResize = false;
    const rect = this.canvasInteractRef.nativeElement.getBoundingClientRect(); // chỉ số của khung canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.interactions.filter((interaction) => {
      interaction.positions.filter((position) => {
        if (
          mouseX >= position.rectX + this.stroke &&
          mouseX <= position.rectX + position.rectWidth - this.stroke &&
          mouseY >= position.rectY + this.stroke &&
          mouseY <= position.rectY + position.rectHeight - this.stroke
        ) {
          this.isDrag = true;
          this.isEResize = false;
          this.isNResize = false;
        }
        if (
          mouseX >= position.rectX &&
          mouseX <= position.rectX + position.rectWidth &&
          mouseY >= position.rectY &&
          mouseY <= position.rectY + position.rectHeight
        ) {
          const offsetX = mouseX - position.rectX;
          const offsetY = mouseY - position.rectY;

          const borderSize = 4;

          if (offsetX >= 0 && offsetX <= borderSize) {
            this.isDrag = false;
            this.isEResize = true;
            this.isNResize = false;
          }

          if (
            offsetX >= position.rectWidth - borderSize &&
            offsetX <= position.rectWidth
          ) {
            this.isDrag = false;
            this.isEResize = true;
            this.isNResize = false;
          }

          if (offsetY >= 0 && offsetY <= borderSize) {
            this.isDrag = false;
            this.isEResize = false;
            this.isNResize = true;
          }

          if (
            offsetY >= position.rectHeight - borderSize &&
            offsetY <= position.rectHeight
          ) {
            this.isDrag = false;
            this.isEResize = false;
            this.isNResize = true;
          }
        }
      });
    });

    this.interactions.filter((interaction) => {
      interaction.positions.filter((position) => {
        if (position.isDragging) {
          const rect =
            this.canvasInteractRef.nativeElement.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;

          // khoảng cách chuột đã di chuyển
          const deltaX = mouseX - position.dragStartX;
          const deltaY = mouseY - position.dragStartY;

          position.rectX += deltaX;
          position.rectY += deltaY;

          this.drawPositionOfInteractions();

          position.dragStartX = mouseX;
          position.dragStartY = mouseY;
        }
        if (position.isResizing) {
          switch (position.resizeDirect) {
            case 'r':
              let deltaX = event.offsetX - position.rectX;
              if (deltaX <= 50) deltaX = 50;

              position.rectWidth = deltaX;
              this.drawPositionOfInteractions();
              break;
            case 'b':
              let deltaY = event.offsetY - position.rectY;
              if (deltaY <= 50) deltaX = 50;

              position.rectHeight = deltaY;
              this.drawPositionOfInteractions();
              break;
          }
        }
      });
    });
  }
  drawPositionOfInteractions() {
    this.ctxInteract.clearRect(
      0,
      0,
      this.canvasInteractRef.nativeElement.width,
      this.canvasInteractRef.nativeElement.height
    );
    this.interactions.filter((interaction) => {
      this.ctxInteract.fillStyle = interaction.bg;
      interaction.positions.filter((position) => {
        this.ctxInteract.fillRect(
          position.rectX,
          position.rectY,
          position.rectWidth,
          position.rectHeight
        );
        this.ctxInteract.beginPath();
        this.ctxInteract.moveTo(
          position.rectX + position.rectWidth,
          position.rectY
        );
        this.ctxInteract.lineTo(
          position.rectX + position.rectWidth,
          position.rectY + position.rectHeight
        );
        this.ctxInteract.stroke();

        this.ctxInteract.beginPath();
        this.ctxInteract.moveTo(
          position.rectX,
          position.rectY + position.rectHeight
        );
        this.ctxInteract.lineTo(
          position.rectX + position.rectWidth,
          position.rectY + position.rectHeight
        );
        this.ctxInteract.stroke();
      });
    });
  }
}
