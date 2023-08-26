import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Story } from 'src/app/models/story.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule],
})
export class StoryCardComponent {
  @Input() story!: Story;
  constructor(private router: Router) {}
  gotoDetailStory(id: number) {
    this.router.navigate(['home/story/detail', id]);
  }
}
