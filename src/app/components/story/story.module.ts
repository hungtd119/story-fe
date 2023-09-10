import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { StoryConfigPageModule } from '../story-config-page/story-config-page.module';
import { StoryDetailComponent } from '../story-detail/story-detail.component';
import { StoryComponent } from './story.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [StoryComponent, StoryDetailComponent],
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
    StoryConfigPageModule,
    NzDrawerModule,
    NzSelectModule,
    NzNotificationModule,
  ],
})
export class StoryModule {}
