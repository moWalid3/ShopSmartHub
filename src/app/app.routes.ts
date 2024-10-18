import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/layout.routes').then(m => m.layoutRoutes)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [authGuard]
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/auth/forgot-password/send-email/send-email.component').then(m => m.SendEmailComponent)
      },
      {
        path: 'verify-code',
        loadComponent: () => import('./pages/auth/forgot-password/verify-code/verify-code.component').then(m => m.VerifyCodeComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./pages/auth/forgot-password/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
      },
    ]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [authGuard]
  },
];
