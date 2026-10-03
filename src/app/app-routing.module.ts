import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { ComplainComponent } from './components/complain/complain.component';
import { AdminComponent } from './components/admin/admin.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { studentGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'chatbot', component: ChatBotComponent, canActivate: [studentGuard] },
  { path: 'complain', component: ComplainComponent, canActivate: [studentGuard] },
  { path: 'admin', component: AdminComponent },
  { path: '404', component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
