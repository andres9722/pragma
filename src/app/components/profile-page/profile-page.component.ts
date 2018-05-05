import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  private userName: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(user => {
      this.userName = user.email
    })
  }

}
