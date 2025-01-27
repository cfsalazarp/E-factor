import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  onLogout(): void {
    console.log('Cerrar sesión');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
