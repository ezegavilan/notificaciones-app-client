import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserPostsComponent } from './components/posts/user-posts/user-posts.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { MercadoPagoRedirectComponent } from './components/mercado-pago/mercado-pago-redirect/mercado-pago-redirect.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/my-posts', component: UserPostsComponent },
  { path: 'posts/new', component: NewPostComponent },
  { path: 'mercado-pago/redirect/success', component: MercadoPagoRedirectComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
