import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StoryComponent } from '../story/story.component';
import { StoryDetailComponent } from '../story-detail/story-detail.component';
import { StoryPlayRunComponent } from '../story-play-run/story-play-run.component';
import { StoryPlayPageComponent } from '../story-play-page/story-play-page.component';
import { StoryConfigPageComponent } from '../story-config-page/story-config-page.component';
import { StoryConfigOnePageComponent } from '../story-config-one-page/story-config-one-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/dashboard/story' },
      { path: 'story', component: StoryComponent },
      { path: 'story-detail/:id', component: StoryDetailComponent },
      { path: 'story-play/:id', component: StoryPlayRunComponent },
      {
        path: 'story-play-page/:id/:storyType',
        component: StoryPlayPageComponent,
      },
      {
        path: 'story-config-pages/:storyId/:storyType',
        component: StoryConfigPageComponent,
      },
      {
        path: 'story-config-page/:pageId/:storyType',
        component: StoryConfigOnePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
