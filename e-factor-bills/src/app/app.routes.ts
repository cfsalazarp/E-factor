import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ErrorComponent } from './auth/error/error.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErrorComponent},
  {
    path: 'e-factor',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'invoices', loadComponent: () => import('./invoices/invoices.component').then(c => c.InvoicesComponent) },
      { path: 'clients', loadComponent: () => import('./clients/clients.component').then(c => c.ClientsComponent) },
      { path: 'products', loadComponent: () => import('./products/products.component').then(c => c.ProductsComponent) },
      { path: 'settings', loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
    title: 'e-factor Home',
  },
  { path: '**', redirectTo: 'login' },
];
