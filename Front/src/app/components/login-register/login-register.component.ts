import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { UserInput } from './../../interfaces/user-input';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/interfaces/alert';

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
  isAdmin = false;
  error = false;

  errorMessage: Alert = {
    type: 'danger',
    message: "Erreur de mot de passe ou de l'adresse email"
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigateByUrl("/Post")
    }
  }

  register(): void {
    const user: UserInput = {
      email: this.email,
      password: this.password
    }

    this.authService.register(user)
    .then(
      () => {
        this.login();
      }
    )
    .catch(
      error => {
        console.error(error);
      }
    )
  }

  login(): void {
    const user: UserInput = {
      email: this.email,
      password: this.password
    }

    if (this.isAdmin) {
      this.authService.loginAdmin(user)
      .then(
        data => {
          this.storageService.saveUser(data.token);
          this.router.navigateByUrl("/Post")
        }
      )
      .catch(
        error => {
          this.error = true;
          console.error(error);
        }
      )
    }
    else {
      this.authService.login(user)
      .then(
        data => {
          this.storageService.saveUser(data.token);
          this.router.navigateByUrl("/Post")
        }
      )
      .catch(
        error => {
          this.error = true;
          console.error(error);
        }
      )
    }
  }


  close(): void {
    this.error = false;
  }

}
