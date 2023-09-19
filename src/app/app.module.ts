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
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { StoryModule } from './pages/story/story.module';
import * as interactionEffects from './store/Interaction/interaction.effects';
import { interactionReducer } from './store/Interaction/interaction.reducers';
import * as pageEffects from './store/page/page.effects';
import { pageReducer } from './store/page/page.reducers';
import * as storyEffects from './store/story/story.effects';
import { storyReducer } from './store/story/story.reducer';
import { userReducer } from './store/user/user.reducer';

registerLocaleData(en);
@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    StoreModule.forRoot({
      story: storyReducer,
      pages: pageReducer,
      interactions: interactionReducer,
      user: userReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true,
    }),
    EffectsModule.forRoot(storyEffects, pageEffects, interactionEffects),
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
