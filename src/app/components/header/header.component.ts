import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private isLogin: boolean;
  private animatedMenu: boolean = false;
  private animatedIconMenu: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    })
  }

  logout () {
    this.authService.logout()
  }

  showMenu () {
    this.animatedMenu = !this.animatedMenu
    this.animatedIconMenu = !this.animatedIconMenu
  }

}
