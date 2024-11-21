import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: 'signup',
        loadComponent: () => import('./public/sign-up/sign-up.component').then(m => m.SignUpComponent)
    },
    {
        path: 'signin',
        loadComponent: () => import('./public/sign-in/sign-in.component').then(m => m.SignInComponent)
    },
    {
        path: '',
        canActivate:[authGuard],
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'dashboard',
        canActivate:[authGuard],
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'cart',
        canActivate:[authGuard],
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
    },
    
];
