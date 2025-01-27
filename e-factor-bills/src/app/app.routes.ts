import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ErrorComponent } from './auth/error/error.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErrorComponent},
  {
    path: 'e-factor',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'clients', component: ClientsComponent},
      { path: 'products', component: ProductsComponent },
      { path: 'settings', component: SettingsComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
    title: 'e-factor Home',
  },
  { path: '**', redirectTo: 'login' },
];
