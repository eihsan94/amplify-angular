import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TweetComponent } from './tweet/tweet.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  // { path: '', component: TweetComponent, canActivate: [AuthGuard] },
  { path: 'tweet', component: TweetComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: TweetComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
