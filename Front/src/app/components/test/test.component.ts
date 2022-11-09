import { UserInput } from './../../interfaces/user-input';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    let test: UserInput;
    test =  {
      email: "araujohugo@msn.com",
      password: "motdepasse"
    }

    this.authService.login(test)
    .then(
      data => {
        console.log(data);
      }
    )
  }

}
