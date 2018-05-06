import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AvataruploadService } from '../../services/avatarupload.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  private userAvatar: string;

  constructor(private authService: AuthService,
              private userService: UserService,
              private avatarService: AvataruploadService,
              private flashMessage: FlashMessagesService
  ) { }

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

      this.avatarService.getAvatar().snapshotChanges().subscribe(item => {
        this.userAvatar = ''
        item.forEach(users => {
          let active = users.payload.toJSON()
          if (user.uid === active['uid']) {
            this.userAvatar = active['url']
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

      this.flashMessage.show('User updated correctly', {cssClass: 'alert__success alert__profile', timeout: 3000})

      this.firstName = null
      this.lastName = null
    })
  }

}
