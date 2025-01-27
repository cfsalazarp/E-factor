import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  title = 'Login E-Factor';

  loginForm: FormGroup;

  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response) => {
          console.log('Autenticación exitosa:', response);
          this.errorMessage = '';
          this.router.navigate(['/e-factor/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error al autenticar:', error);
        },
      });
    }
  }
}
