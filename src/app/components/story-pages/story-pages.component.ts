import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PageService } from 'src/app/services/page.service';
import { StoryService } from 'src/app/services/story.service';
import { loadPages } from 'src/app/store/page/page.actions';
import { PageState } from 'src/app/store/page/page.reducers';
import { Page } from 'src/app/models/page.model';
import { selectPages } from 'src/app/store/page/page.selector';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfigPageComponent } from '../config-page/config-page.component';
@Component({
  selector: 'app-story-pages',
  templateUrl: './story-pages.component.html',
  styleUrls: ['./story-pages.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    ConfigPageComponent,
  ],
})
export class StoryPagesComponent implements OnInit {
  id!: string;

  pages$: Observable<Page[]> = this.store.select(selectPages);
  constructor(private store: Store<PageState>, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    // this.store.dispatch(loadPages({ id: this.id }));
  }
  ngOnInit(): void {}
}
