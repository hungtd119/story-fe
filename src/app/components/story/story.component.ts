import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story.model';
import { StoryService } from 'src/app/services/story.service';
import { Store } from '@ngrx/store';
import {
  loadStories,
  loadStoriesCard,
} from 'src/app/store/story/story.actions';
import { Observable, map } from 'rxjs';
import { StoryState } from 'src/app/store/story/story.reducer';
import {
  selectStories,
  storyFeature,
} from 'src/app/store/story/story.selector';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  stories$: Observable<Story[]> = this.store.select(selectStories);

  constructor(private store: Store<StoryState>) {}
  ngOnInit(): void {
    this.store.dispatch(loadStoriesCard());
  }
}
