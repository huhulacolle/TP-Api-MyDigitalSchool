import { Token } from './../interfaces/token';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  clean(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  saveUser(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("Token");
      localStorage.setItem("Token", token);
    }
  }

  removeUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("Token");
      this.router.navigateByUrl("/")
    }
  }

  isAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem("Token");
      const tokenDecoded: any = jwt_decode(token as string);
      if (tokenDecoded.role == "Admin") {
        return true;
      }
      return false
    }
    return false

  }

  getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem("Token");
      if (user) {
        return JSON.parse(user);
      }
    }

    return {};
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem("Token");
      const helper = new JwtHelperService();

      if (user || !helper.isTokenExpired(user?.toString())) {
        return true;
      }
      return false;
    }
    return false
  }

}
