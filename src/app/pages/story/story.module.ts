import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CanvasLayoutComponent } from '../canvas-layout/canvas-layout.component';
import { ConfigPageCanvasComponent } from '../config-page-canvas/config-page-canvas.component';
import { StoryConfigPageComponent } from '../story-config-page/story-config-page.component';
import { StoryDetailComponent } from '../story-detail/story-detail.component';
import { StoryPlayRunComponent } from '../story-play-run/story-play-run.component';
import { StoryComponent } from './story.component';
import { StoryPlayPageComponent } from '../story-play-page/story-play-page.component';
import { StoryConfigOnePageComponent } from '../story-config-one-page/story-config-one-page.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [
    StoryComponent,
    StoryDetailComponent,
    StoryPlayRunComponent,
    StoryPlayPageComponent,
    StoryConfigPageComponent,
    ConfigPageCanvasComponent,
    CanvasLayoutComponent,
    StoryConfigOnePageComponent,
  ],
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzPaginationModule,
    NzCardModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzBadgeModule,
    NzTabsModule,
    RouterModule,
    NzDrawerModule,
    NzSelectModule,
    NzNotificationModule,
    NzUploadModule,
    NzImageModule,
    NzLayoutModule,
    NzEmptyModule,
    NzSpinModule,
  ],
})
export class StoryModule {}
