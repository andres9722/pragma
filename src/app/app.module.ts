import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from '../environments/environment';
import { FlashMessagesModule } from "angular2-flash-messages";
import { FlashMessagesService } from "angular2-flash-messages";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoService } from './services/todo.service';
import { TodoInfoComponent } from './components/todo-info/todo-info.component';
import { UserService } from './services/user.service';
import { AvataruploadService } from './services/avatarupload.service';
import { AvatarUploadFormComponent } from './components/avatar-upload-form/avatar-upload-form.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    DashboardComponent,
    NotFoundPageComponent,
    HeaderComponent,
    ProfilePageComponent,
    TodoComponent,
    TodoInfoComponent,
    AvatarUploadFormComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FlashMessagesModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService, AuthGuard, FlashMessagesService, TodoService, UserService, AvataruploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
