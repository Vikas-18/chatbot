import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TypeWriterAnimationComponent } from './components/type-writer-animation/type-writer-animation.component';
import { CardComponent } from './components/card/card.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutCardComponent } from './components/about-card/about-card.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ComplainComponent } from './components/complain/complain.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { ComplainTableComponent } from './components/complain-table/complain-table.component';
import { AdminComponent } from './components/admin/admin.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    TypeWriterAnimationComponent,
    CardComponent,
    HomePageComponent,
    AboutCardComponent,
    AboutComponent,
    LoginComponent,
    SignUpComponent,
    ComplainComponent,
    ChatBotComponent,
    ComplainTableComponent,
    AdminComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
