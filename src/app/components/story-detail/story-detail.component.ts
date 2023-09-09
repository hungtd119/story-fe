import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page.model';
import { Story } from 'src/app/models/story.model';
import { loadPages } from 'src/app/store/page/page.actions';
import {
  selectPages,
  selectPagesCount,
} from 'src/app/store/page/page.selector';
import { loadStory } from 'src/app/store/story/story.actions';
import { StoryState } from 'src/app/store/story/story.reducer';
import {
  selectPageStory,
  selectStory,
} from 'src/app/store/story/story.selector';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit {
  id!: string;
  story$: Observable<Story> = this.store.select(selectStory);
  pages$: Observable<Page[]> = this.store.select(selectPages);
  pageCount$: Observable<number> = this.store.select(selectPagesCount);
  story!: any;
  dataLoaded: boolean = false;
  validateFormStoryInfo!: UntypedFormGroup;
  validateFormCreator!: UntypedFormGroup;
  pageIndex = 1;
  perPageSize = 2;

  ngOnInit(): void {
    this.store.dispatch(loadStory({ id: this.id }));
    this.story = this.story$.subscribe((story) => {
      this.validateFormStoryInfo = this.fb.group({
        id: [story.id, [Validators.required]],
        title: [story.title, [Validators.required]],
        level: [story.level, Validators.required],
        coin: [story.coin, Validators.required],
      });
      this.validateFormCreator = this.fb.group({
        author: [story.author, [Validators.required]],
        illustrator: [story.illustrator, [Validators.required]],
      });
    });
    this.store.dispatch(
      loadPages({
        id: this.id,
        limit: this.perPageSize,
        pageNumber: this.pageIndex,
      })
    );

    this.dataLoaded = true;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<StoryState>,
    private fb: UntypedFormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  submitStoryInfo(): void {
    console.log('submit', this.validateFormStoryInfo.value);
  }
  submitFormCreator(): void {
    console.log('submit', this.validateFormCreator.value);
  }
  handleChangePerPageSize(event: number) {
    this.store.dispatch(
      loadPages({ id: this.id, limit: event, pageNumber: this.pageIndex })
    );
    this.perPageSize = event;
  }
  handleChangePageIndex(event: number) {
    this.store.dispatch(
      loadPages({ id: this.id, limit: this.perPageSize, pageNumber: event })
    );
    this.pageIndex = event;
  }
  gotoStoryPageConfig(id: number) {
    this.router.navigate(['/home/story/edit/page', id]);
  }
  gotoConfigPages(storyId: number, pageId: number) {
    this.router.navigate(['dashboard/story-config-page', storyId, pageId]);
  }
}
