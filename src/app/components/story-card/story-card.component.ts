import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Story } from 'src/app/models/story.model';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class StoryCardComponent {
  @Input() story!: Story;
}
