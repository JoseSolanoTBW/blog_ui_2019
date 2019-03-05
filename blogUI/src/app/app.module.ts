import { BlogService } from './services/blog.service';
import { TypeaheadComponent } from './shared/typeahead/typeahead.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { MenubarComponent } from './shared/menubar/menubar.component';
import { PreferenceComponent } from './shared/preference/preference.component';
import { DetailpostComponent } from './detailpost/detailpost.component';
import { TypeaheadModule } from  'node_modules/ngx-type-ahead';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { SinginComponent } from './singin/singin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    PostComponent,
    MenubarComponent,
    PreferenceComponent,
    DetailpostComponent,
    TypeaheadComponent,
    SinginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TypeaheadModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
