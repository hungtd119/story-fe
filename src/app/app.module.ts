import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageComponent } from './components/page/page.component';
import { RegisterComponent } from './components/register/register.component';
import { StoryComponent } from './components/story/story.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StoryCardComponent } from './components/story-card/story-card.component';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    StoryComponent,
    PageComponent,
    HomeComponent,
  ],
  imports: [
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
    StoryCardComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
