import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, Output } from '@angular/core';
import { Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-story-play-canvas',
  templateUrl: './story-play-canvas.component.html',
  styleUrls: ['./story-play-canvas.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class StoryPlayCanvasComponent implements AfterViewInit {
  @Input() page: any = null;
  ngAfterViewInit(): void {}
}
