import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AvataruploadService } from '../../services/avatarupload.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  private userData: User;
  private firstName: string;
  private lastName: string;

  private userActiveEmail: string;
  private userActiveAvatar: string;
  private userActiveProvider: string;
  private userActiveDisplayName: string;

  private userInfo: any = {};
  private providerPass: boolean = false;

  private profileForm: FormGroup;

  constructor(private authService: AuthService,
              private userService: UserService,
              private avatarService: AvataruploadService,
              private flashMessage: FlashMessagesService,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      'firstName': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'lastName': [null, Validators.compose([Validators.required, Validators.minLength(2)])]
    })

    this.authService.getAuth().subscribe(user => {
      this.userActiveEmail = user.email;

      if (user.providerData[0].providerId === 'password') {
        this.providerPass = true;
      }

      this.userService.getUsers().snapshotChanges().subscribe(item => {
        this.userInfo = {}
        item.forEach(users => {
          let active = users.payload.toJSON()
          if (this.userActiveEmail === active['email']) {
            this.userInfo = active
          }
        })
      })

      this.avatarService.getAvatar().snapshotChanges().subscribe(item => {
        this.userActiveAvatar = ''
        item.forEach(users => {
          let active = users.payload.toJSON()
          if (user.uid === active['uid']) {
            this.userActiveAvatar = active['url']
          }
        })
      })

      if(user.providerData[0].providerId === 'google.com' || user.providerData[0].providerId === 'facebook.com') {
        this.userActiveAvatar = user.photoURL
        this.userActiveDisplayName = user.displayName
        this.userActiveProvider = user.providerData[0].providerId
      }
    })
  }

  addUser () {
    this.authService.getAuth().subscribe(user => {
      this.userData = {
        email: user.email,
        uid: user.uid,
        firstName: this.firstName,
        lastName: this.lastName,
      }

      this.userService.addUser(this.userData)

      this.flashMessage.show('User updated correctly', {cssClass: 'alert__success alert__profile', timeout: 3000})

      this.firstName = null
      this.lastName = null
    })
  }

}
