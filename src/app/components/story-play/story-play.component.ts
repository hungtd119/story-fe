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
      text: { text: 'salad bowl' },
      bg: 'red',
      positions: [
        { x: 100, y: 100, width: 50, height: 50 },
        { x: 100, y: 200, width: 50, height: 50 },
      ],
    },
    {
      text: { text: 'boy' },
      bg: 'brown',
      positions: [
        { x: 300, y: 100, width: 50, height: 50 },
        { x: 300, y: 200, width: 50, height: 50 },
      ],
    },
    {
      text: { text: 'girl' },
      bg: 'grey',
      positions: [
        { x: 500, y: 100, width: 50, height: 50 },
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
            this.interactions.forEach((interaction) => {
              interaction.positions.forEach((position: any) => {
                ctxCom.fillStyle = interaction.bg;
                ctxCom.fillRect(
                  position.x,
                  position.y,
                  position.width,
                  position.height
                );
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
                        x >= position.x &&
                        x <= position.x + position.width &&
                        y >= position.y &&
                        y <= position.y + position.height
                      ) {
                        // ctxCom.fillStyle = interaction.bg;
                        // ctxCom.fillRect(
                        //   position.x,
                        //   position.y + position.height,
                        //   position.width + 20,
                        //   position.height
                        // );
                        const fontSize = 16;
                        ctxCom.font = fontSize + 'px Arial';
                        const textWidth = ctxCom.measureText(
                          interaction.text.text
                        ).width;

                        const padding = 10;
                        const rectWidth = textWidth + 2 * padding;
                        const rectHeight = fontSize + 2 * padding;

                        ctxCom.fillStyle = 'lightblue';
                        ctxCom.fillRect(x, y, rectWidth, rectHeight);

                        ctxCom.fillStyle = 'black';
                        ctxCom.fillText(
                          interaction.text.text,
                          x + padding,
                          y + padding + fontSize
                        );
                        setTimeout(() => {
                          ctxCom.clearRect(x, y, rectWidth, rectHeight);
                        }, 2000);
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
