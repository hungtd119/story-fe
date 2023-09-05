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
  @ViewChild('myCanvas', { static: true })
  myCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('interactionCanvas', { static: true })
  interactionCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('textCanvas', { static: true })
  textCanvasRef!: ElementRef<HTMLCanvasElement>;

  ctxRoot!: CanvasRenderingContext2D;
  ctxInteraction!: CanvasRenderingContext2D;
  ctxText!: CanvasRenderingContext2D;

  pageId!: number;
  page!: Page;
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
    this.ctxRoot = this.myCanvasRef.nativeElement.getContext('2d')!;
    this.ctxInteraction =
      this.interactionCanvas.nativeElement.getContext('2d')!;
    this.ctxText = this.textCanvasRef.nativeElement.getContext('2d')!;
    this.store.dispatch(loadPage({ id: this.pageId }));
  }
  ngAfterViewInit(): void {
    this.page$.subscribe({
      next: (pg) => {
        this.ctxRoot.clearRect(
          0,
          0,
          this.myCanvasRef.nativeElement.width,
          this.myCanvasRef.nativeElement.height
        );
        const img = new Image();
        img.src = pg.image?.path;
        img.onload = () => {
          this.ctxRoot.drawImage(
            img,
            0,
            80,
            this.myCanvasRef.nativeElement.width,
            this.myCanvasRef.nativeElement.height - 100
          );

          this.drawText(
            this.textCanvasRef.nativeElement.width / 4,
            this.textCanvasRef.nativeElement.height / 10,
            '48px serif',
            'black'
          );

          setTimeout(() => {
            this.hightLightText(
              this.textCanvasRef.nativeElement.width / 4,
              this.textCanvasRef.nativeElement.height / 10
            );
          }, 1000);
          pg.interactions.forEach((interaction) => {
            interaction.positions.forEach((position: any) => {
              this.renderer.listen(
                this.interactionCanvas.nativeElement,
                'click',
                (event: MouseEvent) => {
                  const x =
                    event.clientX -
                    this.interactionCanvas.nativeElement.getBoundingClientRect()
                      .left;
                  const y =
                    event.clientY -
                    this.interactionCanvas.nativeElement.getBoundingClientRect()
                      .top;

                  interaction.positions.forEach((position: any) => {
                    if (
                      x >= position.position_x &&
                      x <= position.position_x + position.width &&
                      y >= position.position_y &&
                      y <= position.position_y + position.height
                    ) {
                      // play audio
                      console.log(interaction.text.audio.path);

                      this.clearCanvas(
                        this.ctxInteraction,
                        this.interactionCanvas
                      );
                      this.showCom(
                        position.position_x,
                        position.position_y,
                        interaction.text.text
                      );
                      this.jumpText(interaction);
                    }
                  });
                }
              );
            });
          });
        };
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  showCom(x: number, y: number, text: string) {
    const fontSize = 18;
    const borderRadius = 6;

    this.ctxInteraction.font = fontSize + 'px Arial';
    const textWidth = this.ctxInteraction.measureText(text).width;

    const padding = 6;
    const rectWidth = textWidth + 2 * padding;
    const rectHeight = fontSize + 2 * padding + 4;

    this.ctxInteraction.beginPath();
    this.ctxInteraction.moveTo(x + borderRadius, y);
    this.ctxInteraction.lineTo(x + rectWidth - borderRadius, y);
    this.ctxInteraction.arcTo(
      x + rectWidth,
      y,
      x + rectWidth,
      y + borderRadius,
      borderRadius
    );
    this.ctxInteraction.lineTo(x + rectWidth, y + rectHeight - borderRadius);
    this.ctxInteraction.arcTo(
      x + rectWidth,
      y + rectHeight,
      x + rectWidth - borderRadius,
      y + rectHeight,
      borderRadius
    );
    this.ctxInteraction.lineTo(x + borderRadius, y + rectHeight);
    this.ctxInteraction.arcTo(
      x,
      y + rectHeight,
      x,
      y + rectHeight - borderRadius,
      borderRadius
    );
    this.ctxInteraction.lineTo(x, y + borderRadius);
    this.ctxInteraction.arcTo(x, y, x + borderRadius, y, borderRadius);

    this.ctxInteraction.fillStyle = 'black';
    this.ctxInteraction.fill();

    this.ctxInteraction.fillStyle = 'white';
    this.ctxInteraction.fillText(text, x + padding, y + padding + fontSize);
    setTimeout(() => {
      this.ctxInteraction.clearRect(x, y, rectWidth + 1, rectHeight);
    }, 3000);
  }
  jumpText(interaction: Interaction) {
    this.clearCanvas(this.ctxText, this.textCanvasRef);

    const padding = 10;
    this.ctxText.font = '48px serif';
    let currentX = this.x_root;
    for (let index = 0; index < this.syncText.length; index++) {
      const word = this.syncText[index].w;
      this.ctxText.fillStyle = 'black';
      if (this.syncText[index].w === interaction.text.text) {
        this.ctxText.fillStyle = 'red';
        const y_new = this.y_root - 20;
        const wordWidth = this.ctxText.measureText(word).width;
        // add animation here
        const animate = () => {
          this.ctxText.fillText(word, currentX, y_new);
        };
        animate();
        currentX += wordWidth + padding;
      } else {
        this.ctxText.fillText(word, currentX, this.y_root);
        const widthWord = this.ctxText.measureText(word).width;
        currentX += widthWord + padding;
      }
    }
    setTimeout(() => {
      this.clearCanvas(this.ctxText, this.textCanvasRef);

      this.drawText(this.x_root, this.y_root, '48px serif', 'black');
    }, 1000);
  }
  drawText(x: number, y: number, font: string, color: string) {
    const fontSize = 16;
    const padding = 10;
    this.ctxText.font = font;
    this.ctxText.textBaseline = 'middle';
    let currentX = x;
    for (let index = 0; index < this.syncText.length; index++) {
      const word = this.syncText[index].w;
      this.ctxText.fillStyle = color;
      this.ctxText.fillText(word, currentX, y);
      const wordWidth = this.ctxText.measureText(word).width;
      currentX += wordWidth + padding;
    }
  }
  hightLightText(x: number, y: number) {
    this.audio = new Audio();
    this.audio.src =
      'https://firebasestorage.googleapis.com/v0/b/monkey-22059.appspot.com/o/wzEzNjrTTb9fLv10XTZNtQ1672993841348.mp3?alt=media&token=6abb7540-036e-4531-9b27-d98eb5c9c4ac';
    this.audio.play();
    this.currentIndex = 0;
    this.animateHightLight(x, y);
  }
  animateHightLight(x: number, y: number) {
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
        this.clearCanvas(this.ctxText, this.textCanvasRef);
        this.hightLightingText(currentWord, x, y);
        this.currentIndex++;

        if (this.currentIndex < this.syncText.length) {
          this.animateHightLight(x, y);
        }
      } else {
        this.clearCanvas(this.ctxText, this.textCanvasRef);
        this.hightLightingText(currentWord, x, y);
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
  hightLightingText(currentWord: any, x: number, y: number) {
    const padding = 10;
    this.ctxText.font = '48px serif';
    let currentX = x;
    for (let i = 0; i < this.syncText.length; i++) {
      const word = this.syncText[i].w;
      this.ctxText.fillStyle = 'black';
      if (this.syncText[i].w === currentWord.w) this.ctxText.fillStyle = 'red';
      this.ctxText.fillText(word, currentX, y);
      const wordWidth = this.ctxText.measureText(word).width;
      currentX += wordWidth + padding;
    }
  }
}
