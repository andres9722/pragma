import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  private email: string;
  private password: string;

  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  loginUser () {
    this.authService.login(this.email, this.password)
      .then(response => {
        this.flashMessage.show('User login correctly', {cssClass: 'alert__success', timeout: 3000})
        this.router.navigate(['/dashboard'])
      })
      .catch(err => {
        this.flashMessage.show(err.message, {cssClass: 'alert__error', timeout: 3000})
        this.router.navigate(['/login'])
      })
  }

  resetPassword () {
    this.authService.resetPassword(this.email)
      .then(response => this.flashMessage.show('An email was sent to recover your account', {cssClass: 'alert__success', timeout: 3000}))
      .catch(err => this.flashMessage.show(err.message, {cssClass: 'alert__error', timeout: 3000}))
  }

}
