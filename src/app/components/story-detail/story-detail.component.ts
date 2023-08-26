import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { Story } from 'src/app/models/story.model';
import { StoryService } from 'src/app/services/story.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
  ],
})
export class StoryDetailComponent implements OnInit {
  id!: string;
  story!: Story;

  ngOnInit(): void {}
  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.storyService.getStory(this.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.story = response.data;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
