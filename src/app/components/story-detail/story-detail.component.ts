import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Story } from 'src/app/models/story.model';
import { StoryService } from 'src/app/services/story.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PageTextColComponent } from '../page-text-col/page-text-col.component';
import { PageInteractionColComponent } from '../page-interaction-col/page-interaction-col.component';
import { NgPaginatorComponent } from '../ng-paginator/ng-paginator.component';

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
    MatButtonModule,
    MatIconModule,
    RouterModule,
    PageTextColComponent,
    PageInteractionColComponent,
    NgPaginatorComponent,
    MatInputModule,
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
  getTotalItems(pageId: number): number {
    const pageIndex = this.story.pages.findIndex((p) => p.id === pageId);
    if (pageIndex !== -1) {
      return this.story.pages[pageIndex].texts.length;
    }
    return 0;
  }
}
