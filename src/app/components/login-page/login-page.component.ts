import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  private email: string;
  private password: string;
  private loginForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    })
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

  onClickGoogleLogin () {
    this.authService.loginGoogle()
      .then(res => {
        this.flashMessage.show('User login correctly', {cssClass: 'alert__success', timeout: 3000})
        this.router.navigate(['/dashboard'])
      })
      .catch(err => this.flashMessage.show(err.message, {cssClass: 'alert__error', timeout: 3000}))
  }

  onClickFacebookLogin () {
    this.authService.loginFacebook()
      .then(res => {
        this.flashMessage.show('User login correctly', {cssClass: 'alert__success', timeout: 3000})
        this.router.navigate(['/dashboard'])
      })
      .catch(err => this.flashMessage.show(err.message, {cssClass: 'alert__error', timeout: 3000}))
  }

}
