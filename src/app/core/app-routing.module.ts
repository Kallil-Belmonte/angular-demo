import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from 'app/layout/dashboard/dashboard.component';
import { AuthGuardService } from 'app/pages/auth/auth-guard.service';
import { HomeComponent } from 'app/pages/home/home.component';
import { BlogComponent } from 'app/pages/news/blog/blog.component';
import { PostComponent } from 'app/pages/news/post/post.component';
import { EditPostComponent } from 'app/pages/news/edit-post/edit-post.component';
import { ContactComponent } from 'app/pages/contact/contact.component';
import { AccountComponent } from 'app/pages/account/account.component';
import { LoginComponent } from 'app/pages/auth/login/login.component';
import { RegisterComponent } from 'app/pages/auth/register/register.component';
import { NotFoundComponent } from 'app/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [ AuthGuardService ],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'blog', component: BlogComponent },
      { path: 'post/:id', component: PostComponent },
      { path: 'edit-post/:id', component: EditPostComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'account', component: AccountComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register',	component: RegisterComponent },
  { path: '**', component: NotFoundComponent	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
