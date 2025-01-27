import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = environment.FACTUS_URL_API;
  clientId = environment.FACTUS_CLIENT_ID;
  clientSecret = environment.FACTUS_CLIENT_SECRET;

  private token: string = "";

  /**
   * Valida si el usuario está autenticado.
   * @returns observable booleano si está autenticado o no.
   */
  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('auth_token');
    return of(!!token);
  }

  /**
   * Realiza la autenticación del usuario.
   * @param username El correo del usuario.
   * @param password La contraseña del usuario.
   * @returns Un observable con el token o un error.
   */
  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);
    body.set('username', username);
    body.set('password', password);

    return this.http
      .post(`${this.apiUrl}/oauth/token`, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        tap((response: any) => {
          this.token = response.access_token;
          localStorage.setItem('auth_token', this.token);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Devuelve el token actual del usuario.
   * @returns El token o null si no está autenticado.
   */
  getToken(): string | null {
    return this.token ?? localStorage.getItem('token');
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout(): void {
    this.token = "";
    localStorage.removeItem('token');
  }

  /**
   * Maneja errores de la API.
   * @param error El error recibido de la API.
   * @returns Un observable con el error procesado.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error inesperado.';
    if (error.error?.error_description) {
      errorMessage = error.error.error_description;
    }
    return throwError(() => new Error(errorMessage));
  }
}
