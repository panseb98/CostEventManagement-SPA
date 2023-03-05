import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, private router: Router) {}

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }

    return false;
  }

  public login(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigate(['/event']);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  }

  public async getUsername(): Promise<string> {
    const res =  this.jwtHelper.decodeToken(this.getToken());
    return res;
  }

  public getToken(): string {
    return localStorage.getItem('token') as string;
  }
}
