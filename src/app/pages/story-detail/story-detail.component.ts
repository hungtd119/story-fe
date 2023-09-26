import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cloudinary } from '@cloudinary/url-gen';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { Image } from 'src/app/models/image.model';
import { Page } from 'src/app/models/page.model';
import { Story } from 'src/app/models/story.model';
import { Text } from 'src/app/models/text.model';
import { AudioService } from 'src/app/services/audio.service';
import { ImageService } from 'src/app/services/image.service';
import { PageService } from 'src/app/services/page.service';
import { StoryService } from 'src/app/services/story.service';
import { TextService } from 'src/app/services/text.service';
import { TextconfifService } from 'src/app/services/textconfig.service';
import { loadPages } from 'src/app/store/page/page.actions';
import {
  selectPages,
  selectPagesCount,
} from 'src/app/store/page/page.selector';
import { loadStory } from 'src/app/store/story/story.actions';
import { StoryState } from 'src/app/store/story/story.reducer';
import { selectStory } from 'src/app/store/story/story.selector';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit {
  formStoryInfo!: FormGroup;
  formStoryCreator!: FormGroup;
  formCreatePage!: FormGroup;
  formCreateText!: FormGroup;

  story$: Observable<Story> = this.store.select(selectStory);
  pages$: Observable<Page[]> = this.store.select(selectPages);
  pageCount$: Observable<number> = this.store.select(selectPagesCount);

  id!: string;
  images!: Image[];
  story!: any;
  dataLoaded: boolean = false;
  texts!: Text[];

  pageIndex = 1;
  perPageSize = 2;
  visible = false;
  isVisible = false;
  isVisibleText = false;
  wordSyncData = '';
  isLoading = true;
  text = '';
  text_id!: number;
  pathPageImage =
    'data:image/png;base64,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';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<StoryState>,
    private fb: FormBuilder,
    private imageService: ImageService,
    private pageService: PageService,
    private notification: NzNotificationService,
    private textService: TextService,
    private textConfigService: TextconfifService,
    private storyService: StoryService,
    private audioService: AudioService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this.store.dispatch(loadStory({ id: this.id }));
    this.story = this.story$.subscribe((story) => {
      if (story) {
        this.isLoading = false;
      }
      this.formStoryInfo = this.fb.group({
        id: [story.id, [Validators.required]],
        title: [story.title, [Validators.required]],
        level: [story.level, Validators.required],
        coin: [story.coin, Validators.required],
        type: [story.type, Validators.required],
      });
      this.formStoryCreator = this.fb.group({
        id: [story.id, Validators.required],
        author: [story.author, [Validators.required]],
        illustrator: [story.illustrator, [Validators.required]],
      });
    });
    this.formCreateText = this.fb.group({
      text: ['', Validators.required],
      wordSync: ['', Validators.required],
    });
    this.story$.subscribe((story) => {
      this.pageCount$.subscribe((pageCount) => {
        this.formCreatePage = this.fb.group({
          page_number: [pageCount + 1, Validators.required],
          width_device: [1170, Validators.required],
          height_device: [571, Validators.required],
          image_id: ['', Validators.required],
          story_id: [story.id],
          text_id: ['', Validators.required],
        });
      });
    });

    this.imageService.getImages().subscribe((response) => {
      this.images = response.data;
    });
    this.store.dispatch(
      loadPages({
        id: this.id,
        limit: this.perPageSize,
        pageNumber: this.pageIndex,
      })
    );
    this.textService.getAllTexts().subscribe((response) => {
      this.texts = response.data;
    });

    this.dataLoaded = true;
  }
  showModal(): void {
    this.isVisible = true;
  }

  showModalText(): void {
    this.isVisibleText = true;
  }

  submitStoryInfo(): void {
    this.storyService
      .updateStory(this.formStoryInfo.value)
      .subscribe((response) => {
        if (response.success) {
          this.notification.create(
            'success',
            'Story notification',
            response.message
          );
        }
      });
  }
  submitFormCreator(): void {
    this.storyService
      .updateStory(this.formStoryCreator.value)
      .subscribe((response) => {
        if (response.success) {
          this.notification.create(
            'success',
            'Story notification',
            response.message
          );
        }
      });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  handleOkText(): void {
    console.log(this.text);
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  handleCancelText(): void {
    this.isVisibleText = false;
  }
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      const path = info.file.response.url;
      const filename = info.file.response.original_filename;
      this.imageService
        .createImage({ path, filename })
        .subscribe((response) => {
          const image = new Image();
          image.path = response.data.path;
          image.filename = response.data.filename;
          image.id = response.data.id;
          image.created_at = response.data.created_at;
          image.updated_at = response.data.updated_at;
          this.images.push(image);
          this.formCreatePage.patchValue({ image_id: image.id });
          this.pathPageImage = response.data.path;
          this.isVisible = false;
        });
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }
  handleChangeUploadAudio(info: NzUploadChangeParam) {
    if (info.file.status !== 'uploading') {
      const path = info.file.response.url;
      const filename = info.file.response.original_filename;

      this.audioService
        .createAudio({
          filename,
          path,
          time: 10,
          text_id: this.text_id,
        })
        .subscribe((response) => {
          if (response.success) {
            this.notification.create(
              'success',
              'Upload audio',
              response.message
            );
          } else {
            this.notification.create('error', 'Upload Audio', response.message);
          }
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
  handleSubmitFormCreatePage() {
    if (this.formCreatePage.invalid) {
      this.notification.create(
        'error',
        'Validate Notification',
        'Validate form invalid'
      );
    } else {
      this.pageService
        .createPage(this.formCreatePage.value)
        .subscribe((response) => {
          if (response.success) {
            this.textConfigService
              .createTextConfig({
                page_id: response.data.id,
                text_id: this.formCreatePage.value.text_id,
              })
              .subscribe((response) => {
                if (response.success) {
                  this.notification.create(
                    'success',
                    'Page create notification',
                    response.message
                  );
                  this.formCreatePage.reset();
                  this.close();
                  this.story$.subscribe((story) => {
                    this.store.dispatch(
                      loadPages({
                        id: story.id.toString(),
                        limit: this.perPageSize,
                        pageNumber: this.pageIndex,
                      })
                    );
                  });
                }
              });
          } else {
            this.notification.create(
              'error',
              'Page create notification',
              response.message
            );
          }
        });
    }
  }
  handleSubmitCreateText() {
    const newText = {
      ...this.formCreateText.value,
      wordSync: this.formCreateText.value.wordSync.replace(/\s|\n/g, ''),
    };

    this.textService.createText(newText).subscribe((response) => {
      if (response.success) {
        this.formCreateText.reset();
        this.isVisibleText = false;
        const text = new Text();
        text.id = response.data.id;
        text.wordSync = response.data.wordSync;
        text.text = response.data.text;
        this.texts.unshift(text);
        this.text_id = text.id;
        this.formCreatePage.patchValue({ text_id: text.id });
      }
    });
  }
  gotoStoryPageConfig(id: number) {
    this.router.navigate(['/home/story/edit/page', id]);
  }
  gotoConfigPages(storyId: number) {
    this.router.navigate(['dashboard/story-config-pages', storyId]);
  }
  gotoConfigPage(pageId: number) {
    this.router.navigate(['dashboard/story-config-page', pageId]);
  }
}
