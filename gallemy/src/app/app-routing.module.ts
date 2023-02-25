import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { UploaderComponent } from './uploader/uploader.component';
import { PicDetailsComponent } from './pic-details/pic-details.component';
import { CategoriesComponent } from './categories/categories.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'upload', component: UploaderComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  { 
    path: 'gallery', component: GalleryComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  { 
    path: 'gallery/:picId', component: PicDetailsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  { 
    path: 'categories', component: CategoriesComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
