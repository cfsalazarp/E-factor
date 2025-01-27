import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
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
export class LoginComponent implements OnInit {
  title = 'Login E-Factor';

  private _snackBar = inject(MatSnackBar);

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

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe({
      next: (res) => {
        if (res) {
          this.router.navigate(['/e-factor/dashboard']);
        }
      },
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response) => {
          console.log('Autenticación exitosa:', response);
          this.errorMessage = '';
          this._snackBar.open('Autenticación exitosa','',{
            duration: 2000,
            panelClass: ['succes-snackbar'],
          });
          this.router.navigate(['/e-factor/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error al autenticar:', error);
          this._snackBar.open(this.errorMessage ?? 'Unknown error','',{
            duration: 2000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }
}
