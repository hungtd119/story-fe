import { loadStoriesCard } from './../../store/story/story.actions';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story.model';
import { StoryService } from 'src/app/services/story.service';
import { Store } from '@ngrx/store';
import { loadStories } from 'src/app/store/story/story.actions';
import { Observable, map } from 'rxjs';
import { StoryState } from 'src/app/store/story/story.reducer';
import {
  selectStories,
  selectStoriesCount,
  storyFeature,
} from 'src/app/store/story/story.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  stories$: Observable<Story[]> = this.store.select(selectStories);
  count$: Observable<number> = this.store.select(selectStoriesCount);
  isVisible = false;
  pageIndex = 1;
  perPageSize = 4;

  ngOnInit(): void {
    this.store.dispatch(
      loadStoriesCard({ limit: this.perPageSize, pageNumber: this.pageIndex })
    );
  }
  constructor(private store: Store<StoryState>, private router: Router) {}
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  handleChangePerPageSize(event: number) {
    this.store.dispatch(
      loadStoriesCard({ limit: event, pageNumber: this.pageIndex })
    );
    this.perPageSize = event;
  }
  handleChangePageIndex(event: number) {
    this.store.dispatch(
      loadStoriesCard({ limit: this.perPageSize, pageNumber: event })
    );
    this.pageIndex = event;
  }
  gotoDetailStory(id: number) {
    this.router.navigate(['dashboard/story-detail', id]);
  }
}
