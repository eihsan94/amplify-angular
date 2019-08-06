import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TweetComponent } from './tweet/tweet.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'tweet', component: TweetComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
