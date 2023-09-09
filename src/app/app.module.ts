import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigPageComponent } from './components/config-page/config-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HeaderContentComponent } from './components/header-content/header-content.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageComponent } from './components/page/page.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StoryPagesComponent } from './components/story-pages/story-pages.component';
import { StoryPlayCanvasComponent } from './components/story-play-canvas/story-play-canvas.component';
import { StoryPlayComponent } from './components/story-play/story-play.component';
import { StoryModule } from './components/story/story.module';
import * as pageEffects from './store/page/page.effects';
import { pageReducer } from './store/page/page.reducers';
import * as storyEffects from './store/story/story.effects';
import { storyReducer } from './store/story/story.reducer';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageComponent,
    HomeComponent,
  ],
  imports: [
    StoreModule.forRoot({ story: storyReducer, pages: pageReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true,
    }),
    EffectsModule.forRoot(storyEffects, pageEffects),
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    AppRoutingModule,
    LoginComponent,
    RegisterComponent,
    FormsModule,
    ReactiveFormsModule,
    ForgotPasswordComponent,
    HeaderComponent,
    HttpClientModule,
    SidebarComponent,
    HeaderContentComponent,
    StoryPagesComponent,
    ConfigPageComponent,
    StoryPlayComponent,
    StoryPlayCanvasComponent,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzModalModule,
    StoryModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
