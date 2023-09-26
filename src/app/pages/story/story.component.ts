import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { Image, Image as ImageModel } from 'src/app/models/image.model';
import { Story } from 'src/app/models/story.model';
import { ImageService } from 'src/app/services/image.service';
import { StoryService } from 'src/app/services/story.service';
import { StoryState } from 'src/app/store/story/story.reducer';
import {
  selectStories,
  selectStoriesCount,
} from 'src/app/store/story/story.selector';
import { loadStoriesCard } from './../../store/story/story.actions';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  formCreateStory!: FormGroup;

  stories$: Observable<Story[]> = this.store.select(selectStories);
  count$: Observable<number> = this.store.select(selectStoriesCount);

  images!: Image[];
  isVisible = false;
  pageIndex = 1;
  perPageSize = 4;
  visible = false;
  isVisibleUploadImage = false;
  isLoading = true;
  keyword = '';

  pathPageImage =
    'data:image/png;base64,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';

  ngOnInit(): void {
    this.store.dispatch(
      loadStoriesCard({
        limit: this.perPageSize,
        pageNumber: this.pageIndex,
        keywords: this.keyword,
      })
    );
    this.isLoading = false;
    this.imageService.getImages().subscribe((response) => {
      this.images = response.data;
    });
    this.formCreateStory = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      illustrator: ['', Validators.required],
      level: ['', Validators.required],
      coin: [0, Validators.required],
      type: [0, Validators.required],
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

  showModalUploadImage(): void {
    this.isVisibleUploadImage = true;
  }

  handleOkUploadImage(): void {
    this.isVisibleUploadImage = false;
  }

  handleCancelUploadImage(): void {
    this.isVisibleUploadImage = false;
  }
  handleClickSearch = () => {
    this.store.dispatch(
      loadStoriesCard({
        limit: this.perPageSize,
        pageNumber: this.pageIndex,
        keywords: this.keyword,
      })
    );
  };
  handleChangeUploadImage(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      const path = info.file.response.url;
      const filename = info.file.response.original_filename;
      this.imageService
        .createImage({ path, filename })
        .subscribe((response) => {
          const image = new ImageModel();
          image.path = response.data.path;
          image.filename = response.data.filename;
          image.id = response.data.id;
          image.created_at = response.data.created_at;
          image.updated_at = response.data.updated_at;
          this.images.push(image);
          this.formCreateStory.patchValue({ image_id: image.id });
          this.pathPageImage = response.data.path;
          this.isVisibleUploadImage = false;
        });
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }
  handleChangePerPageSize(event: number) {
    this.store.dispatch(
      loadStoriesCard({
        limit: event,
        pageNumber: this.pageIndex,
        keywords: this.keyword,
      })
    );
    this.perPageSize = event;
  }
  handleChangePageIndex(event: number) {
    this.store.dispatch(
      loadStoriesCard({
        limit: this.perPageSize,
        pageNumber: event,
        keywords: this.keyword,
      })
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
                keywords: this.keyword,
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
  gotoPlayStory(id: number) {
    this.router.navigate(['dashboard/story-play', id]);
  }
}
