import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('auth_token');
    return of(!!token);
  }

  login(username: string, password: string): Promise<void> {
    //TODO implement real login
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('auth_token', 'admin');
        resolve();
      }
    });
  }
}
