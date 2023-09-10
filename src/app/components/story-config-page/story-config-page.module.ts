import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryConfigPageComponent } from './story-config-page.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { RouterModule } from '@angular/router';
import { ConfigPageCanvasComponent } from '../config-page-canvas/config-page-canvas.component';
import { CanvasLayoutComponent } from '../canvas-layout/canvas-layout.component';
import { ConfigPageComponent } from '../config-page/config-page.component';

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
  ],
})
export class StoryConfigPageModule {}
