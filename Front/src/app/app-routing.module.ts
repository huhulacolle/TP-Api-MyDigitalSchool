import { PostsComponent } from './components/posts/posts.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginRegisterComponent },
  { path: 'Post', component: PostsComponent },
  { path: '', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
