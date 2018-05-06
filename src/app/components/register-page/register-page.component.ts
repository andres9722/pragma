import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  private email: string;
  private password: string;

  constructor(public authService: AuthService, public router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  registerUser () {
    this.authService.registerUser(this.email, this.password)
      .then(response => {
        this.flashMessage.show('User created correctly', {cssClass: 'alert__success', timeout: 3000})
        this.router.navigate(['/dashboard'])
      })
      .catch(err => {
        this.flashMessage.show(err.message, {cssClass: 'alert__error', timeout: 3000})
      })
  }

}
