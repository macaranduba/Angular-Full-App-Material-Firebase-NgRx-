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

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if( user ) {
        this.isAuthenticated = true;
        this.authChange.next( true );
        this.router.navigate( [ '/training' ] );
      } else {
        this.isAuthenticated = false;
        this.authChange.next( false );
        this.router.navigate( [ '/login' ] );
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then( result => {
        //console.log(result);
      })
      .catch( error => console.log(error) );
  }

  login(authData: AuthData) {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then( result => {
      console.log(result);
    })
    .catch( error => console.log(error) );
}

  logout() {
    this.afAuth.signOut(); // get ride of the authentication token
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
