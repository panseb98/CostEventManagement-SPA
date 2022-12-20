import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');

    if (token) {
      const tokenPayload = decode(token) as any;

      if (!this.auth.isAuthenticated() || tokenPayload?.role !== expectedRole) {
        this.router.navigate(['login']);
        return false;
      }

      return true;
    }

    return false;

  }
}
