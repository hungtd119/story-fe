import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadPageToConfig } from 'src/app/store/page/page.actions';

@Component({
  selector: 'app-story-config-one-page',
  templateUrl: './story-config-one-page.component.html',
  styleUrls: ['./story-config-one-page.component.scss'],
})
export class StoryConfigOnePageComponent implements OnInit {
  pageId!: string;
  constructor(private route: ActivatedRoute, private store: Store) {
    this.route.params.subscribe((params) => {
      this.pageId = params['pageId'];
    });
  }
  ngOnInit(): void {
    this.store.dispatch(loadPageToConfig({ id: this.pageId }));
  }
}
