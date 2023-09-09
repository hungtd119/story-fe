import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './story.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { StoryDetailComponent } from '../story-detail/story-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { StoryConfigPageComponent } from 'src/app/components/story-config-page/story-config-page.component';

@NgModule({
  declarations: [
    StoryComponent,
    StoryDetailComponent,
    StoryConfigPageComponent,
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
  ],
})
export class StoryModule {}
