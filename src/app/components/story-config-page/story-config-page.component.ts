import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page.model';
import {
  loadPageToConfig,
  loadPageToConfigByStoryId,
  loadPagesId,
} from 'src/app/store/page/page.actions';
import { PageState } from 'src/app/store/page/page.reducers';
import {
  selectPage,
  selectPageCount,
  selectPagesId,
} from 'src/app/store/page/page.selector';

@Component({
  selector: 'app-story-config-page',
  templateUrl: './story-config-page.component.html',
  styleUrls: ['./story-config-page.component.scss'],
})
export class StoryConfigPageComponent {
  storyId!: string;
  pageId!: string;
  $pagesId: Observable<any> = this.store.select(selectPagesId);
  constructor(private store: Store<PageState>, private router: ActivatedRoute) {
    this.router.params.subscribe((params) => {
      this.storyId = params['storyId'];
      this.pageId = params['pageId'];
    });
  }
  ngOnInit(): void {
    this.store.dispatch(loadPagesId({ storyId: this.storyId }));
  }
  handleSelectTabChange(event: any) {
    this.$pagesId.subscribe((pageId) => {
      this.store.dispatch(
        loadPageToConfig({ id: (pageId = pageId[event.index].id) })
      );
    });
  }
}
