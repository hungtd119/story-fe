import { loadStoriesCard, postStory } from './../../store/story/story.actions';
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
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';
import {
  FormBuilder,
  FormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  stories$: Observable<Story[]> = this.store.select(selectStories);
  count$: Observable<number> = this.store.select(selectStoriesCount);

  images!: Image[];
  isVisible = false;
  pageIndex = 1;
  perPageSize = 4;
  visible = false;

  formCreateStory!: FormGroup;

  ngOnInit(): void {
    this.store.dispatch(
      loadStoriesCard({ limit: this.perPageSize, pageNumber: this.pageIndex })
    );
    this.imageService.getImages().subscribe((response) => {
      this.images = response.data;
    });
    this.formCreateStory = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      illustrator: ['', Validators.required],
      level: ['', Validators.required],
      coin: [0, Validators.required],
      image_id: ['', Validators.required],
    });
  }
  constructor(
    private store: Store<StoryState>,
    private router: Router,
    private imageService: ImageService,
    private storyService: StoryService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
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

  submitCreateStory() {
    if (this.formCreateStory.invalid) {
      this.createNotification('error', 'Validate form invalid');
      return;
    } else {
      this.storyService
        .createStory(this.formCreateStory.value)
        .subscribe((response) => {
          if (response.success) {
            this.createNotification('success', response.message);
            this.formCreateStory.reset();
            this.close();
            this.store.dispatch(
              loadStoriesCard({
                limit: this.perPageSize,
                pageNumber: this.pageIndex,
              })
            );
          } else {
            this.createNotification('error', response.message);
          }
        });
    }
  }
  createNotification(type: string, message: string): void {
    this.notification.create(type, 'Story Notification', message);
  }

  gotoDetailStory(id: number) {
    this.router.navigate(['dashboard/story-detail', id]);
  }
}
