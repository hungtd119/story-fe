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
import { MatTableModule } from '@angular/material/table';
import { HeaderContentComponent } from '../header-content/header-content.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    HeaderContentComponent,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class StoryComponent implements OnInit {
  stories$: Observable<Story[]> = this.store.select(selectStories);

  constructor(private store: Store<StoryState>) {}
  ngOnInit(): void {
    this.store.dispatch(loadStoriesCard());
  }
}
