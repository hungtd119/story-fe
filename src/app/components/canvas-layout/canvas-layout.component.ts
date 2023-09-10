import { Observable } from 'rxjs';
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Page } from 'src/app/models/page.model';
import { Store } from '@ngrx/store';
import { selectPage } from 'src/app/store/page/page.selector';
import { CanvasObject } from 'src/app/models/canvasObject.model';
import { InteractionCanvas } from 'src/app/models/interactionCanvas';
@Component({
  selector: 'app-canvas-layout',
  templateUrl: './canvas-layout.component.html',
  styleUrls: ['./canvas-layout.component.scss'],
})
export class CanvasLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  $page: Observable<any> = this.store.select(selectPage);

  stroke = 3;
  isEResize = false;
  isNResize = false;
  isDrag = false;

  interactions = [
    {
      bg: 'red',
      text: 'Boy',
      positions: [
        {
          isDragging: false,
          isResizing: false,
          resizeDirect: '',
          dragStartX: 0,
          dragStartY: 0,
          position_x: 50,
          position_y: 50,
          width: 50,
          height: 50,
        },
      ],
    },
    {
      bg: 'yellow',
      text: 'Salad Bowl',
      positions: [
        {
          isDragging: false,
          isResizing: false,
          resizeDirect: '',
          dragStartX: 0,
          dragStartY: 0,
          position_x: 200,
          position_y: 200,
          width: 50,
          height: 50,
        },
        {
          isDragging: false,
          isResizing: false,
          resizeDirect: '',
          dragStartX: 0,
          dragStartY: 0,
          position_x: 400,
          position_y: 500,
          width: 50,
          height: 50,
        },
      ],
    },
    {
      text: 'Girl',
      bg: 'brown',
      positions: [
        {
          isDragging: false,
          isResizing: false,
          resizeDirect: '',
          dragStartX: 0,
          dragStartY: 0,
          position_x: 300,
          position_y: 300,
          width: 50,
          height: 50,
        },
      ],
    },
  ];

  canvasObject!: CanvasObject;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.canvasObject = new CanvasObject();
  }
  ngAfterViewInit(): void {
    this.$page.subscribe((page) => {
      this.canvasObject.bg = page.image?.path;
      this.canvasObject.interactionsCanvas = this.interactions;
      this.drawCanvas();
    });
  }

  onMouseUp() {
    this.canvasObject.interactionsCanvas.filter((interaction) => {
      interaction.positions.filter((position) => {
        position.isDragging = false;
        position.isResizing = false;
      });
    });
  }
  onMouseDown(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect(); // chỉ số của khung canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.canvasObject.interactionsCanvas.filter((interaction) => {
      interaction.positions.filter((position) => {
        if (
          mouseX >= position.position_x + this.stroke &&
          mouseX <= position.position_x + position.width - this.stroke &&
          mouseY >= position.position_y + this.stroke &&
          mouseY <= position.position_y + position.height - this.stroke
        ) {
          position.isDragging = true;
          position.isResizing = false;
          position.dragStartX = mouseX;
          position.dragStartY = mouseY;
        }
        if (
          mouseX >= position.position_x &&
          mouseX <= position.position_x + position.width &&
          mouseY >= position.position_y &&
          mouseY <= position.position_y + position.height
        ) {
          const offsetX = mouseX - position.position_x;
          const offsetY = mouseY - position.position_y;
          const borderSize = 4;

          console.log(offsetX, offsetY);
          console.log(position.width - borderSize, position.width);

          if (
            offsetX >= position.width - borderSize &&
            offsetX <= position.width
          ) {
            position.isDragging = false;
            position.isResizing = true;
            position.resizeDirect = 'r';
            console.log('resizing r');
          }

          if (
            offsetY >= position.height - borderSize &&
            offsetY <= position.height
          ) {
            position.isDragging = false;
            position.isResizing = true;
            position.resizeDirect = 'b';
            console.log('resizing b');
          }
        }
      });
    });
  }
  onMouseMove(event: MouseEvent) {
    this.isDrag = false;
    this.isEResize = false;
    this.isNResize = false;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect(); // chỉ số của khung canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.canvasObject.interactionsCanvas.filter((interaction) => {
      interaction.positions.filter((position) => {
        if (
          mouseX >= position.position_x + this.stroke &&
          mouseX <= position.position_x + position.width - this.stroke &&
          mouseY >= position.position_y + this.stroke &&
          mouseY <= position.position_y + position.height - this.stroke
        ) {
          this.isDrag = true;
          this.isEResize = false;
          this.isNResize = false;
        }
        if (
          mouseX >= position.position_x &&
          mouseX <= position.position_x + position.width &&
          mouseY >= position.position_y &&
          mouseY <= position.position_y + position.height
        ) {
          const offsetX = mouseX - position.position_x;
          const offsetY = mouseY - position.position_y;

          const borderSize = 4;

          if (offsetX >= 0 && offsetX <= borderSize) {
            this.isDrag = false;
            this.isEResize = true;
            this.isNResize = false;
          }

          if (
            offsetX >= position.width - borderSize &&
            offsetX <= position.width
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
            offsetY >= position.height - borderSize &&
            offsetY <= position.height
          ) {
            this.isDrag = false;
            this.isEResize = false;
            this.isNResize = true;
          }
        }
      });
    });

    this.canvasObject.interactionsCanvas.filter((interaction) => {
      interaction.positions.filter((position) => {
        if (position.isDragging) {
          const rect = this.canvasRef.nativeElement.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;

          // khoảng cách chuột đã di chuyển
          const deltaX = mouseX - position.dragStartX;
          const deltaY = mouseY - position.dragStartY;

          position.position_x += deltaX;
          position.position_y += deltaY;

          this.drawCanvas();

          position.dragStartX = mouseX;
          position.dragStartY = mouseY;
        }
        if (position.isResizing) {
          switch (position.resizeDirect) {
            case 'r':
              let deltaX = event.offsetX - position.position_x;
              if (deltaX <= 50) deltaX = 50;

              position.width = deltaX;
              this.drawCanvas();
              break;
            case 'b':
              let deltaY = event.offsetY - position.position_y;
              if (deltaY <= 50) deltaX = 50;

              position.height = deltaY;
              this.drawCanvas();
              break;
          }
        }
      });
    });
  }

  drawCanvas() {
    const background = new Image();
    background.src = this.canvasObject.bg;
    background.onload = () => {
      this.ctx.drawImage(
        background,
        0,
        0,
        this.canvasRef.nativeElement.width,
        this.canvasRef.nativeElement.height
      );
      this.drawInteractions();
    };
  }
  drawInteractions() {
    this.canvasObject.interactionsCanvas.filter((interaction) => {
      this.ctx.fillStyle = interaction.bg;
      interaction.positions.filter((position) => {
        this.ctx.fillRect(
          position.position_x,
          position.position_y,
          position.width,
          position.height
        );
        this.ctx.beginPath();
        this.ctx.moveTo(
          position.position_x + position.width,
          position.position_y
        );
        this.ctx.lineTo(
          position.position_x + position.width,
          position.position_y + position.height
        );
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(
          position.position_x,
          position.position_y + position.height
        );
        this.ctx.lineTo(
          position.position_x + position.width,
          position.position_y + position.height
        );
        this.ctx.stroke();
      });
    });
  }
}
