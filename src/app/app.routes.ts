import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'authentication',
    loadComponent: () => import('./components/authentication/authentication').then(m => m.Authentication)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/authentication/register/register').then(m => m.Register)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/authentication/login/login').then(m => m.Login)
  }
 ];
