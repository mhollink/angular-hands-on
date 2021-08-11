import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import {CommonModule} from "@angular/common";
import { ChatMessageComponent } from './components/chat-message/chat-message.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent },
  {path: 'registration', component: RegistrationPageComponent },
  {path: 'chat', component: ChatPageComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
]

@NgModule({
  declarations: [AppComponent, LoginPageComponent, RegistrationPageComponent, ChatPageComponent, ChatMessageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
