import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable()
export class AuthService {
  /**
   * true is it is signed in, false otherwise
   */
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then( result => {
        //console.log(result);
        this.authSuccessfully();
      })
      .catch( error => console.log(error) );
  }

  login(authData: AuthData) {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then( result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch( error => console.log(error) );
}

  logout() {
    this.afAuth.signOut(); // get ride of the authentication token
    this.isAuthenticated = false;
    this.authChange.next( false );
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next( true );
    this.router.navigate( [ '/training' ] );
  }
}
