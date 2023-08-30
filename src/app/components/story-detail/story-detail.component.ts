import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Story } from 'src/app/models/story.model';
import { StoryService } from 'src/app/services/story.service';
import { loadStory } from 'src/app/store/story/story.actions';
import { StoryState } from 'src/app/store/story/story.reducer';
import { selectStory } from 'src/app/store/story/story.selector';
import { NgPaginatorComponent } from '../ng-paginator/ng-paginator.component';
import { PageInteractionColComponent } from '../page-interaction-col/page-interaction-col.component';
import { PageTextColComponent } from '../page-text-col/page-text-col.component';

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
  story$: Observable<Story> = this.store.select(selectStory);
  dataLoaded: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(loadStory({ id: this.id }));
    this.dataLoaded = true;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<StoryState>
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  gotoStoryPageConfig(id: number) {
    this.router.navigate(['/home/story/edit/page', id]);
  }
}
