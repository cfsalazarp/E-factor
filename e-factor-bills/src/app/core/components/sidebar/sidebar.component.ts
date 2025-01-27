import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  menuItems = [
    {
      title: 'Dashboard',
      icon: 'home',
      link: '/dashboard'
    },
    {
      title: 'Invoices',
      icon: 'receipt',
      link: '/invoices'
    },
    {
      title: 'Clients',
      icon: 'person',
      link: '/clients'
    },
    {
      title: 'Products',
      icon: 'inventory_2',
      link: '/products'
    },
    // {
    //   title: 'Settings',
    //   icon: 'settings',
    //   link: '/settings'
    // }
  ];

}
