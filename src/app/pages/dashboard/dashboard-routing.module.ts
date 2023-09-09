import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StoryComponent } from 'src/app/components/story/story.component';
import { StoryDetailComponent } from 'src/app/components/story-detail/story-detail.component';
import { StoryConfigPageComponent } from 'src/app/components/story-config-page/story-config-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'story', component: StoryComponent },
      { path: 'story-detail/:id', component: StoryDetailComponent },
      {
        path: 'story-config-page/:storyId/:pageId',
        component: StoryConfigPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
