import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'app/auth/login/login.component';
import { RegisterComponent } from 'app/auth/register/register.component';
import { DashboardComponent } from 'app/core/dashboard/dashboard.component';
import { BlogComponent } from 'app/news/blog/blog.component';
import { PostComponent } from 'app/news/post/post.component';
import { EditPostComponent } from 'app/news/edit-post/edit-post.component';
import { ContactComponent } from 'app/contact/contact.component';
import { AccountComponent } from 'app/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
      { path: 'blog', component: BlogComponent },
      { path: 'post/:id', component: PostComponent },
      { path: 'edit-post/:id', component: EditPostComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'account', component: AccountComponent }
    ]
  },
  { path: 'login', component: LoginComponent, /* canActivate: [ AuthGuard ] */ },
  { path: 'register',	component: RegisterComponent },
  { path: '**', component: LoginComponent, /* canActivate: [ AuthGuard ] */	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
