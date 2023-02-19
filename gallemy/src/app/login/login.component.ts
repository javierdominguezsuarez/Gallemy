import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../interfaces/login-data.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  login(loginData: LoginData) {
    console.log("button click")
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['gallery']))
      .catch((e) => console.log(e.message))
  }
}
