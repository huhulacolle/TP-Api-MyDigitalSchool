import { UserInput } from './../interfaces/user-input';
import { Token } from './../interfaces/token';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(userInput: UserInput): Promise<Token> {
    return lastValueFrom(this.http.post<Token>(environment.api + "user/login", userInput))
  }

  test(): Promise<any> {
    return lastValueFrom(this.http.get("http://localhost:3000/posts/"));
  }
}
