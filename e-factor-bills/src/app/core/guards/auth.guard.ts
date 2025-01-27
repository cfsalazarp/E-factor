import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard{

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate: CanActivateFn = (
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any => {
    return this.authService.isAuthenticated().pipe(
      map((res: any) => {
        console.log('res', res);
        return this.validation(res, state);
      }),
      catchError((err: any) => {
        console.log('err', err);
        this.router.navigate(['/error'], {
          queryParams: {
            return: state.url
          }
        });
        return err;
      })
    );
  };

  validation(res: boolean, state: RouterStateSnapshot): boolean | UrlTree {
    console.log('Se valida la autenticación', res);
    if (res) {
      return true;
    } else {
      return this.router.parseUrl(`/error`);
    }
  }
};
