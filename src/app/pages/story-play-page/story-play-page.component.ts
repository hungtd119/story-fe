import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CanvasConfigObject } from 'src/app/models/canvasConfigObject.model';
import { Interaction } from 'src/app/models/interaction.model';
import { Page } from 'src/app/models/page.model';
import { Position } from 'src/app/models/position.model';
import { SyncText } from 'src/app/models/sycnText.model';
import { loadPagePlay } from 'src/app/store/page/page.actions';
import { selectPage } from 'src/app/store/page/page.selector';

@Component({
  selector: 'app-story-play-page',
  templateUrl: './story-play-page.component.html',
  styleUrls: ['./story-play-page.component.scss'],
})
export class StoryPlayPageComponent implements OnInit, AfterViewInit {
  syncText!: SyncText[];
  formResolution!: FormGroup;

  @ViewChild('myCanvas', { static: true })
  myCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('interactionCanvas', { static: true })
  interactionCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('textCanvas', { static: true })
  textCanvasRef!: ElementRef<HTMLCanvasElement>;

  ctxRoot!: CanvasRenderingContext2D;
  ctxInteraction!: CanvasRenderingContext2D;
  ctxText!: CanvasRenderingContext2D;

  canvasObject!: CanvasConfigObject;
  page$: Observable<Page> = this.store.select(selectPage);
  pageId!: string;
  audio!: HTMLAudioElement;
  timer!: number;
  currentIndex: number = 0;
  timerStartHightLight!: number;
  animationStarted = false;
  width_device!: number;
  height_device!: number;
  page_width!: number;
  page_height!: number;
  audioSrc = '';
  font!: string;
  storyType!: string;

  words = [
    {
      text: 'Roy',
      icon: 'https://res.cloudinary.com/dhhahwrmr/image/upload/v1695695289/f4f5dcaa85909646e04bde9b5f9b3f04_rlhuju.png',
    },
  ];

  constructor(
    private routerActive: ActivatedRoute,
    private store: Store,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {
    this.routerActive.params.subscribe((params) => {
      this.pageId = params['id'];
      this.storyType = params['storyType'];
    });
  }
  ngOnInit(): void {
    this.store.dispatch(loadPagePlay({ id: this.pageId }));
    this.ctxRoot = this.myCanvasRef.nativeElement.getContext('2d')!;
    this.ctxInteraction =
      this.interactionCanvas.nativeElement.getContext('2d')!;
    this.ctxText = this.textCanvasRef.nativeElement.getContext('2d')!;
    this.canvasObject = new CanvasConfigObject();
    this.page$.subscribe((page) => {
      this.width_device = page.width_device;
      this.height_device = page.height_device;
      this.page_width = page.width_device;
      this.page_height = page.height_device;
      this.formResolution = this.fb.group({
        width_device: [page.width_device, Validators.required],
        height_device: [page.height_device, Validators.required],
      });
      this.syncText = JSON.parse(page.texts[0].wordSync);
      this.syncText.push({
        ...this.syncText[this.syncText.length - 1],
        s: this.syncText[this.syncText.length - 1].s + 1,
        w: '',
      });
      this.audioSrc = page.texts[0].audio.path;
      this.font = this.storyType === '1' ? '28px serif' : '48px serif';
    });
  }
  ngAfterViewInit(): void {
    this.page$.subscribe({
      next: (page) => {
        this.canvasObject.bg = page.image?.path;
        this.canvasObject.interactionsCanvas = page.interactions;
        this.startCanvas();
      },
    });
  }
  handleSubmitResolution() {
    this.width_device = this.formResolution.value.width_device;
    this.height_device = this.formResolution.value.height_device;
    this.startCanvas();
  }
  startCanvas() {
    this.ctxRoot.clearRect(0, 0, this.width_device, this.height_device);
    this.ctxInteraction.clearRect(0, 0, this.width_device, this.height_device);
    this.ctxText.clearRect(0, 0, this.width_device, this.height_device);
    const img = new Image();
    img.src = this.canvasObject.bg;
    img.onload = () => {
      this.ctxRoot.drawImage(img, 0, 0, this.width_device, this.height_device);

      this.ctxText.font = this.font;

      this.drawText(
        this.storyType === '1'
          ? this.width_device / 2
          : this.width_device / 2 -
              this.ctxText.measureText(
                this.syncText.map((text) => text.w).join(' ')
              ).width /
                2,
        this.height_device / 10,
        this.font,
        'black'
      );
      this.canvasObject.interactionsCanvas =
        this.canvasObject.interactionsCanvas.map((interaction) => {
          return {
            ...interaction,
            positions: interaction.positions.map((position) => {
              return this.transformResolution(position);
            }),
          };
        });
      this.page_width = this.width_device;
      this.page_height = this.height_device;

      this.canvasObject.interactionsCanvas.forEach((interaction) => {
        interaction.positions.forEach((position: any) => {
          this.ctxInteraction.fillStyle = interaction.bg;
          this.ctxInteraction.fillRect(
            position.position_x,
            position.position_y,
            position.width,
            position.height
          );
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
                  const audio = new Audio();
                  audio.src = interaction.text.audio.path;
                  audio.play();

                  this.clearCanvas(this.ctxInteraction, this.interactionCanvas);
                  this.showCom(
                    position.position_x,
                    position.position_y,
                    interaction.text
                  );
                  if (this.storyType !== '1') {
                    this.jumpText(interaction);
                  }
                }
              });
            }
          );
        });
      });
    };
  }
  handleClickStart() {
    this.hightLightText(
      this.width_device / 2 -
        this.ctxText.measureText(this.syncText.map((text) => text.w).join(' '))
          .width /
          2,
      this.textCanvasRef.nativeElement.height / 10
    );
    this.audio = new Audio();
    this.audio.src = this.audioSrc;
    this.audio.play();
  }
  transformResolution(position: Position) {
    return {
      ...position,
      position_x: (this.width_device * position.position_x) / this.page_width,
      position_y: (this.height_device * position.position_y) / this.page_height,
      width: (this.width_device * position.width) / this.page_width,
      height: (this.height_device * position.height) / this.page_height,
    };
  }
  showCom(x: number, y: number, textObj: any) {
    const text = textObj.text;

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

    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(() => {
      this.ctxInteraction.clearRect(x, y, rectWidth + 1, rectHeight);
    }, 2000);
  }

  jumpText(interaction: Interaction) {
    let x =
      this.storyType === '1'
        ? this.width_device / 2
        : this.width_device / 2 -
          this.ctxText.measureText(
            this.syncText.map((text) => text.w).join(' ')
          ).width /
            2;
    let y = this.height_device / 10;
    this.clearCanvas(this.ctxText, this.textCanvasRef);
    const padding = this.storyType === '1' ? 20 : 10;
    this.ctxText.font = this.font;
    this.ctxText.textBaseline = 'middle';
    let currentX = this.storyType === '1' ? x - x / 3 : x;
    this.storyType === '1'
      ? this.width_device / 2 -
        this.ctxText.measureText(this.syncText.map((text) => text.w).join(' '))
          .width /
          2 -
        (this.width_device / 2 -
          this.ctxText.measureText(
            this.syncText.map((text) => text.w).join(' ')
          ).width /
            2) /
          3
      : this.width_device / 2 -
        this.ctxText.measureText(this.syncText.map((text) => text.w).join(' '))
          .width /
          2;

    for (let index = 0; index < this.syncText.length; index++) {
      const word = this.syncText[index].w;
      this.ctxText.font = this.font;
      this.ctxText.textBaseline = 'middle';
      if (
        currentX >= this.width_device / 2 - x / 3 + 350 &&
        this.storyType === '1'
      ) {
        currentX = this.width_device / 2 - x / 3;
        y += 70;
      }
      if (
        this.syncText[index].w.replace(/[^\w\s]/gi, '') ===
        interaction.text.text
      ) {
        this.ctxText.fillStyle = 'red';
        const y_new = y - 20;
        const wordWidth = this.ctxText.measureText(word).width;
        this.ctxText.fillText(word, currentX, y_new);
        currentX += wordWidth + padding;
        // add animation here
        // const animate = () => {
        //   this.ctxText.fillText(word, currentX, y_new);
        // };
        // animate();
      } else {
        this.ctxText.fillText(word, currentX, y);
        const widthWord = this.ctxText.measureText(word).width;
        currentX += widthWord + padding;
      }
    }

    setTimeout(() => {
      this.clearCanvas(this.ctxText, this.textCanvasRef);
      this.drawText(
        this.storyType === '1'
          ? this.width_device / 2
          : this.width_device / 2 -
              this.ctxText.measureText(
                this.syncText.map((text) => text.w).join(' ')
              ).width /
                2,
        this.height_device / 10,
        this.font,
        'black'
      );
    }, 1000);
  }
  drawText(x: number, y: number, font: string, color: string) {
    const padding = this.storyType === '1' ? 20 : 10;
    this.ctxText.font = font;
    this.ctxText.textBaseline = 'middle';
    let currentX = this.storyType === '1' ? x - x / 3 : x;
    for (let index = 0; index < this.syncText.length; index++) {
      const word = this.syncText[index].w;
      if (
        currentX >= this.width_device / 2 - x / 3 + 350 &&
        this.storyType === '1'
      ) {
        currentX = this.width_device / 2 - x / 3;
        y += 70;
      }
      if (this.storyType === '1' && word === this.words[0].text) {
        const image = new Image();
        image.src = this.words[0].icon;
        const x = currentX;
        const y_c = y - 30;
        image.onload = () => {
          this.ctxRoot.drawImage(image, x, y_c, 30, 70);
        };
        currentX += 30 + padding;
      } else {
        this.ctxText.fillStyle = color;
        this.ctxText.fillText(word, currentX, y);
        const wordWidth = this.ctxText.measureText(word).width;
        currentX += wordWidth + padding;
      }
    }
  }
  hightLightText(x: number, y: number) {
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
        this.hightLightingText(
          currentWord,
          this.storyType === '1' ? this.width_device / 2 : x,
          y
        );
        this.currentIndex++;

        if (this.currentIndex < this.syncText.length) {
          this.animateHightLight(x, y);
        }
      } else {
        this.clearCanvas(this.ctxText, this.textCanvasRef);
        this.hightLightingText(
          currentWord,
          this.storyType === '1' ? this.width_device / 2 : x,
          y
        );
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
    const padding = this.storyType === '1' ? 20 : 10;
    this.ctxText.font = this.font;
    let currentX = this.storyType === '1' ? x - x / 3 : x;
    for (let i = 0; i < this.syncText.length; i++) {
      const word = this.syncText[i].w;
      if (
        currentX >= this.width_device / 2 - x / 3 + 350 &&
        this.storyType === '1'
      ) {
        currentX = this.width_device / 2 - x / 3;
        y += 70;
      }
      if (this.storyType === '1' && word === this.words[0].text) {
        if (this.syncText[i].s === currentWord.s) {
          // add animation to scale icon
          const image = new Image();
          image.src = this.words[0].icon;
          const x = currentX;
          const y_c = y - 30;
          image.onload = () => {
            this.ctxRoot.drawImage(image, x, y_c, 30, 70);
          };
          this.ctxRoot.clearRect(x - 20, y_c, 50, 90);
        }
        currentX += 30 + padding;
      } else {
        this.ctxText.fillStyle = 'black';
        if (this.syncText[i].s === currentWord.s) {
          this.ctxText.fillStyle = 'red';
          this.ctxText.fillText(word, currentX, y);
          const wordWidth = this.ctxText.measureText(word).width;
          currentX += wordWidth + padding;
        } else {
          this.ctxText.fillText(word, currentX, y);
          const wordWidth = this.ctxText.measureText(word).width;
          currentX += wordWidth + padding;
        }
      }
    }
  }
}
