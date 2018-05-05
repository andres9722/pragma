import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { User } from '../models/user';

@Injectable()
export class UserService {
  private userList: AngularFireList<any>;

  constructor(private firebaseDB: AngularFireDatabase) { }

  getUsers () {
    this.userList = this.firebaseDB.list('users');
    return this.userList;
  }

  addUser(user: User) {
    this.userList.update(user.uid, {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    })
  }

  updateUser($key: string, user) {
    this.userList.update($key, {firstName: user.firstName, lastName: user.lastName})
  }

}
