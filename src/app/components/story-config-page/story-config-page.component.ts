import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadPageToConfigByStoryId } from 'src/app/store/page/page.actions';
import { PageState } from 'src/app/store/page/page.reducers';

@Component({
  selector: 'app-story-config-page',
  templateUrl: './story-config-page.component.html',
  styleUrls: ['./story-config-page.component.scss'],
})
export class StoryConfigPageComponent implements OnInit {
  storyId!: string;
  pageId!: string;
  constructor(private store: Store<PageState>, private router: ActivatedRoute) {
    this.router.params.subscribe((params) => {
      console.log(params);

      this.storyId = params['storyId'];
      this.pageId = params['pageId'];
    });
  }
  ngOnInit(): void {
    this.store.dispatch(
      loadPageToConfigByStoryId({ storyId: this.storyId, pageId: this.pageId })
    );
  }
}
