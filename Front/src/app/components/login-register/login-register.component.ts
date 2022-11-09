import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { UserInput } from './../../interfaces/user-input';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) { }

  email!: string;
  password!: string;

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigateByUrl("/Post")
    }
  }

  login(): void {
    const user: UserInput = {
      email: this.email,
      password: this.password
    }
    this.authService.login(user)
    .then(
      data => {
        this.storageService.saveUser(data.token);
        this.router.navigateByUrl("/Post")
      }
    )
    .catch(
      error => {
        console.error(error);
      }
    )
  }

}
