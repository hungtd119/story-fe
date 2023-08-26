import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story.model';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  stories: Story[] = [];
  constructor(private storyService: StoryService) {
    this.storyService.getStories().subscribe({
      next: (response) => {
        if (response.success) this.stories = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngOnInit(): void {}
}
