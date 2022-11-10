import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private router: Router
  ) { }

  clean(): void {
    sessionStorage.clear();
  }

  saveUser(token: string): void {
    sessionStorage.removeItem("Token");
    sessionStorage.setItem("Token", token);
  }

  removeUser(): void {
    sessionStorage.removeItem("Token");
    this.router.navigateByUrl("/")
  }

  getUser(): any {
    const user = sessionStorage.getItem("Token");
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  isLoggedIn(): boolean {
    const user = sessionStorage.getItem("Token");
    const helper = new JwtHelperService();

    if (user || !helper.isTokenExpired(user?.toString())) {
      return true;
    }
    return false;
  }

}
