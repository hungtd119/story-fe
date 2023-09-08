import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './story.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [StoryComponent],
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
  ],
})
export class StoryModule {}
