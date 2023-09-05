import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page.model';
import { loadPage } from 'src/app/store/page/page.actions';
import { PageState } from 'src/app/store/page/page.reducers';
import { selectPage } from 'src/app/store/page/page.selector';
import { StoryPlayCanvasComponent } from '../story-play-canvas/story-play-canvas.component';
import { Interaction } from 'src/app/models/interaction.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-story-play',
  templateUrl: './story-play.component.html',
  styleUrls: ['./story-play.component.scss'],
  standalone: true,
  imports: [CommonModule, StoryPlayCanvasComponent, MatButtonModule],
})
export class StoryPlayComponent implements OnInit, AfterViewInit {
  pageId!: number;

  page!: Page;
  @ViewChild('myCanvas', { static: false })
  myCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('secondCanvas', { static: false })
  secondCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('textCanvas', { static: false })
  textCanvasRef!: ElementRef<HTMLCanvasElement>;
  page$: Observable<Page> = this.store.select(selectPage);

  animationStarted = false;

  syncText = [
    { s: 0, e: 1200, w: 'Finally,' },
    { s: 1200, e: 1490, w: 'I' },
    { s: 1490, e: 1700, w: 'will' },
    { s: 1700, e: 2100, w: 'add' },
    { s: 2100, e: 2260, w: 'the' },
    { s: 2260, e: 3580, w: 'dressing' },
    { s: 3880, e: 3880, w: '' },
  ];

  x_root = 300;
  y_root = 70;
  currentIndex: number = 0;
  audio!: HTMLAudioElement;

  constructor(
    private route: ActivatedRoute,
    private store: Store<PageState>,
    private renderer: Renderer2
  ) {
    this.route.params.subscribe((params) => {
      this.pageId = params['page'];
    });
  }
  ngOnInit(): void {
    this.store.dispatch(loadPage({ id: this.pageId }));
  }
  ngAfterViewInit(): void {
    this.page$.subscribe({
      next: (pg) => {
        const canvas: HTMLCanvasElement = this.myCanvasRef.nativeElement;
        const ctx = canvas.getContext('2d');

        const canvasCom: HTMLCanvasElement = this.secondCanvasRef.nativeElement;
        const ctxCom = canvasCom.getContext('2d');

        const canvasText: HTMLCanvasElement = this.textCanvasRef.nativeElement;
        const ctxText = canvasText.getContext('2d');
        if (ctx && ctxCom && ctxText) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const img = new Image();
          img.src = pg.image?.path;
          img.onload = () => {
            ctx.drawImage(img, 0, 80, canvas.width, canvas.height - 100);
            console.log(canvasText.height / 10);

            this.drawText(
              ctxText,
              canvasText.width / 4,
              canvasText.height / 10,
              '48px serif',
              'black'
            );

            setTimeout(() => {
              this.hightLightText(
                ctxText,
                this.textCanvasRef,
                canvasText.width / 4,
                canvasText.height / 10
              );
            }, 1000);
            pg.interactions.forEach((interaction) => {
              interaction.positions.forEach((position: any) => {
                this.renderer.listen(
                  canvasCom,
                  'click',
                  (event: MouseEvent) => {
                    const x =
                      event.clientX - canvasCom.getBoundingClientRect().left;
                    const y =
                      event.clientY - canvasCom.getBoundingClientRect().top;

                    interaction.positions.forEach((position: any) => {
                      if (
                        x >= position.position_x &&
                        x <= position.position_x + position.width &&
                        y >= position.position_y &&
                        y <= position.position_y + position.height
                      ) {
                        // play audio
                        console.log(interaction.text.audio.path);

                        this.clearCanvas(ctxCom, this.secondCanvasRef);
                        this.showCom(
                          ctxCom,
                          this.secondCanvasRef,
                          position.position_x,
                          position.position_y,
                          interaction.text.text
                        );
                        this.jumpText(ctxText, interaction);
                      }
                    });
                  }
                );
              });
            });
          };
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  showCom(
    ctx: CanvasRenderingContext2D,
    canvasRef: ElementRef,
    x: number,
    y: number,
    text: string
  ) {
    const fontSize = 18;
    const borderRadius = 6;

    ctx.font = fontSize + 'px Arial';
    const textWidth = ctx.measureText(text).width;

    const padding = 6;
    const rectWidth = textWidth + 2 * padding;
    const rectHeight = fontSize + 2 * padding + 4;

    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + rectWidth - borderRadius, y);
    ctx.arcTo(x + rectWidth, y, x + rectWidth, y + borderRadius, borderRadius);
    ctx.lineTo(x + rectWidth, y + rectHeight - borderRadius);
    ctx.arcTo(
      x + rectWidth,
      y + rectHeight,
      x + rectWidth - borderRadius,
      y + rectHeight,
      borderRadius
    );
    ctx.lineTo(x + borderRadius, y + rectHeight);
    ctx.arcTo(
      x,
      y + rectHeight,
      x,
      y + rectHeight - borderRadius,
      borderRadius
    );
    ctx.lineTo(x, y + borderRadius);
    ctx.arcTo(x, y, x + borderRadius, y, borderRadius);

    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.fillText(text, x + padding, y + padding + fontSize);
    setTimeout(() => {
      ctx.clearRect(x, y, rectWidth + 1, rectHeight);
    }, 3000);
  }
  jumpText(ctx: CanvasRenderingContext2D, interaction: Interaction) {
    this.clearCanvas(ctx, this.textCanvasRef);

    const padding = 10;
    ctx.font = '48px serif';
    let currentX = this.x_root;
    for (let index = 0; index < this.syncText.length; index++) {
      const word = this.syncText[index].w;
      ctx.fillStyle = 'black';
      if (this.syncText[index].w === interaction.text.text) {
        ctx.fillStyle = 'red';
        const y_new = this.y_root - 20;
        const wordWidth = ctx.measureText(word).width;
        // add animation here
        const animate = () => {
          ctx.fillText(word, currentX, y_new);
        };
        animate();
        currentX += wordWidth + padding;
      } else {
        ctx.fillText(word, currentX, this.y_root);
        const widthWord = ctx.measureText(word).width;
        currentX += widthWord + padding;
      }
    }
    setTimeout(() => {
      this.clearCanvas(ctx, this.textCanvasRef);

      this.drawText(ctx, this.x_root, this.y_root, '48px serif', 'black');
    }, 1000);
  }
  drawText(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    font: string,
    color: string
  ) {
    const fontSize = 16;
    const padding = 10;
    ctx.font = font;
    ctx.textBaseline = 'middle';
    let currentX = x;
    for (let index = 0; index < this.syncText.length; index++) {
      const word = this.syncText[index].w;
      ctx.fillStyle = color;
      ctx.fillText(word, currentX, y);
      const wordWidth = ctx.measureText(word).width;
      currentX += wordWidth + padding;
    }
  }
  hightLightText(
    ctx: CanvasRenderingContext2D,
    canvasRef: ElementRef,
    x: number,
    y: number
  ) {
    this.audio = new Audio();
    this.audio.src =
      'https://firebasestorage.googleapis.com/v0/b/monkey-22059.appspot.com/o/wzEzNjrTTb9fLv10XTZNtQ1672993841348.mp3?alt=media&token=6abb7540-036e-4531-9b27-d98eb5c9c4ac';
    this.audio.play();
    this.currentIndex = 0;
    this.animateHightLight(ctx, canvasRef, x, y);
  }
  animateHightLight(
    ctx: CanvasRenderingContext2D,
    canvasRef: ElementRef,
    x: number,
    y: number
  ) {
    if (this.currentIndex >= this.syncText.length) {
      return;
    }

    const currentWord = this.syncText[this.currentIndex];

    const startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const process =
        (currentTime - startTime) / (currentWord.e - currentWord.s);
      if (process >= 1) {
        this.clearCanvas(ctx, canvasRef);
        this.hightLightingText(currentWord, x, y, ctx);
        this.currentIndex++;

        if (this.currentIndex < this.syncText.length) {
          this.animateHightLight(ctx, canvasRef, x, y);
        }
      } else {
        this.clearCanvas(ctx, canvasRef);
        this.hightLightingText(currentWord, x, y, ctx);
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }
  clearCanvas(ctx: CanvasRenderingContext2D, canvasRef: ElementRef) {
    ctx.clearRect(
      0,
      0,
      canvasRef.nativeElement.width,
      canvasRef.nativeElement.height
    );
  }
  hightLightingText(
    currentWord: any,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D
  ) {
    const padding = 10;
    ctx.font = '48px serif';
    let currentX = x;
    for (let i = 0; i < this.syncText.length; i++) {
      const word = this.syncText[i].w;
      ctx.fillStyle = 'black';
      if (this.syncText[i].w === currentWord.w) ctx.fillStyle = 'red';
      ctx.fillText(word, currentX, y);
      const wordWidth = ctx.measureText(word).width;
      currentX += wordWidth + padding;
    }
  }
}
