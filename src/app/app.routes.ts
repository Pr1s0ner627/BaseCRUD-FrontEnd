import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: Dashboard
  // },
  {
    path: 'authentication',
    loadComponent: () => import('./components/authentication/authentication').then(m => m.Authentication)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/authentication/register/register').then(m => m.Register)
  }
 ];
