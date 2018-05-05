import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  private user: User
  private userEmail: string;
  private firstName: string;
  private lastName: string;
  private userInfo: any;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(user => {
      this.userEmail = user.email
      this.userService.getUsers().snapshotChanges().subscribe(item => {
        this.userInfo = {}
        item.forEach(users => {
          let active = users.payload.toJSON()
          if (user.email === active['email']) {
            this.userInfo = active
          }
        })
      })
    })
  }

  addUser () {
    this.authService.getAuth().subscribe(user => {
      this.user = {
        email: user.email,
        uid: user.uid,
        firstName: this.firstName,
        lastName: this.lastName,
      }

      this.userService.addUser(this.user)

      this.firstName = null
      this.lastName = null
    })
  }

}
