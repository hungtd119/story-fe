import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryConfigPageComponent } from './story-config-page.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { RouterModule } from '@angular/router';
import { ConfigPageCanvasComponent } from '../config-page-canvas/config-page-canvas.component';
import { CanvasLayoutComponent } from '../canvas-layout/canvas-layout.component';
import { ConfigPageComponent } from '../config-page/config-page.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
  declarations: [
    StoryConfigPageComponent,
    ConfigPageCanvasComponent,
    CanvasLayoutComponent,
    ConfigPageCanvasComponent,
  ],
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzTabsModule,
    ConfigPageComponent,
    NzInputModule,
    NzCardModule,
    NzDividerModule,
    NzButtonModule,
    NzTagModule,
    NzGridModule,
    NzBadgeModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzUploadModule,
    NzModalModule,
    NzDrawerModule,
    NzImageModule,
    NzSelectModule,
  ],
})
export class StoryConfigPageModule {}
