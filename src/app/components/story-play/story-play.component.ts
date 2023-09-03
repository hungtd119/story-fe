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
  page$: Observable<Page> = this.store.select(selectPage);

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
        if (ctx && ctxCom) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const img = new Image();
          img.src = pg.image?.path;
          img.onload = () => {
            ctx.drawImage(img, 0, 80, canvas.width, canvas.height - 100);
            ctx.font = '48px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
              pg.texts[0].text,
              canvas.width / 2,
              canvas.height / 10
            );
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
                        const fontSize = 18;
                        const borderRadius = 6;

                        ctxCom.font = fontSize + 'px Arial';
                        const textWidth = ctxCom.measureText(
                          interaction.text.text
                        ).width;

                        const padding = 6;
                        const rectWidth = textWidth + 2 * padding;
                        const rectHeight = fontSize + 2 * padding + 4;

                        ctxCom.beginPath();
                        ctxCom.moveTo(x + borderRadius, y);
                        ctxCom.lineTo(x + rectWidth - borderRadius, y);
                        ctxCom.arcTo(
                          x + rectWidth,
                          y,
                          x + rectWidth,
                          y + borderRadius,
                          borderRadius
                        );
                        ctxCom.lineTo(
                          x + rectWidth,
                          y + rectHeight - borderRadius
                        );
                        ctxCom.arcTo(
                          x + rectWidth,
                          y + rectHeight,
                          x + rectWidth - borderRadius,
                          y + rectHeight,
                          borderRadius
                        );
                        ctxCom.lineTo(x + borderRadius, y + rectHeight);
                        ctxCom.arcTo(
                          x,
                          y + rectHeight,
                          x,
                          y + rectHeight - borderRadius,
                          borderRadius
                        );
                        ctxCom.lineTo(x, y + borderRadius);
                        ctxCom.arcTo(x, y, x + borderRadius, y, borderRadius);

                        ctxCom.fillStyle = 'black';
                        ctxCom.fill();

                        ctxCom.fillStyle = 'white';
                        ctxCom.fillText(
                          interaction.text.text,
                          x + padding,
                          y + padding + fontSize
                        );
                        setTimeout(() => {
                          ctxCom.clearRect(x, y, rectWidth + 1, rectHeight);
                        }, 1000);
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
}
