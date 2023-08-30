import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PageService } from 'src/app/services/page.service';
import { StoryService } from 'src/app/services/story.service';
import { loadPages } from 'src/app/store/page/page.actions';
import { PageState } from 'src/app/store/page/page.reducers';
@Component({
  selector: 'app-story-pages',
  templateUrl: './story-pages.component.html',
  styleUrls: ['./story-pages.component.scss'],
  standalone: true,
  imports: [MatTabsModule],
})
export class StoryPagesComponent implements OnInit {
  id!: number;
  constructor(private store: Store<PageState>, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.store.dispatch(loadPages({ id: this.id }));
  }
  ngOnInit(): void {}
}
