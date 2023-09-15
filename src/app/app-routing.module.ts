import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { StoryComponent } from './components/story/story.component';
import { PageComponent } from './components/page/page.component';
import { StoryDetailComponent } from './components/story-detail/story-detail.component';
import { StoryPagesComponent } from './components/story-pages/story-pages.component';
import { StoryPlayComponent } from './components/story-play/story-play.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // },
  // {
  //   path: 'forgot-password',
  //   component: ForgotPasswordComponent,
  // },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard/story' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   children: [
  //     {
  //       path: 'story/edit/page/:id',
  //       component: StoryPagesComponent,
  //     },
  //     {
  //       path: 'story/detail/:id',
  //       component: StoryDetailComponent,
  //     },
  //     {
  //       path: 'story/play/:id/:page',
  //       component: StoryPlayComponent,
  //     },
  //     {
  //       path: 'story',
  //       component: StoryComponent,
  //     },
  //   ],
  // },

  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
