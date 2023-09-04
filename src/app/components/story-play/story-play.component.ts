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

@Component({
  selector: 'app-story-play',
  templateUrl: './story-play.component.html',
  styleUrls: ['./story-play.component.scss'],
  standalone: true,
  imports: [CommonModule, StoryPlayCanvasComponent],
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

  syncText = [
    { s: 0, e: 1200, w: 'Hey,' },
    { s: 1200, e: 1490, w: 'do' },
    { s: 1490, e: 1700, w: 'you' },
    { s: 1700, e: 2100, w: 'want' },
    { s: 2100, e: 2260, w: 'to' },
    { s: 2260, e: 3580, w: 'eat' },
    { s: 3580, e: 3880, w: 'salad' },
    { s: 3880, e: 3880, w: '' },
  ];

  interactions: any[] = [
    {
      text: { text: 'girl' },
      bg: 'red',
      positions: [
        { x: 750, y: 435, width: 50, height: 50 },
        { x: 710, y: 465, width: 50, height: 50 },
      ],
    },
    {
      text: { text: 'boy' },
      bg: 'brown',
      positions: [
        { x: 430, y: 465, width: 50, height: 50 },
        { x: 400, y: 435, width: 50, height: 50 },
      ],
    },
    {
      text: { text: 'Salad Bowl' },
      bg: 'grey',
      positions: [
        { x: 517, y: 232, width: 130, height: 50 },
        { x: 540, y: 270, width: 80, height: 38 },
      ],
    },
  ];

  currentIndex: number = 0;

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
        const ctxText = canvasCom.getContext('2d');
        if (ctx && ctxCom && ctxText) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const img = new Image();
          img.src = pg.image?.path;
          img.onload = () => {
            ctx.drawImage(img, 0, 80, canvas.width, canvas.height - 100);
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
                        console.log(interaction);
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
