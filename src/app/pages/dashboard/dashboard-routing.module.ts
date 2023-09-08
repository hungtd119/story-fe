import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StoryComponent } from 'src/app/components/story/story.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{ path: 'story', component: StoryComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
