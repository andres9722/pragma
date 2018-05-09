import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'
import  "rxjs/add/operator/map";

@Injectable()
export class AuthService {

  constructor (public afAuth: AngularFireAuth) { }

  registerUser (email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData)),
        err => reject(err)
    })
  }

  login (email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData)),
        err => reject(err)
    })
  }

  logout () {
    return this.afAuth.auth.signOut()
  }

  getAuth () {
    return this.afAuth.authState.map(auth => auth)
  }

  resetPassword (email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
  }

  loginGoogle () {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  loginFacebook () {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  }
}
