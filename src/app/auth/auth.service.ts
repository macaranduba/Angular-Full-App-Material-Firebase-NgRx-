import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { UIService } from './../shared/ui.service';
import { SnackBarService } from "./../shared/material/snack-bar.service";

@Injectable()
export class AuthService {
  /**
   * true is it is signed in, false otherwise
   */
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBarService: SnackBarService,
    private uiService: UIService,
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
    this.uiService.loadingStateChanged.next( true );
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then( result => {
        //console.log(result);
        this.uiService.loadingStateChanged.next( false );
      })
      .catch( error => {
        this.uiService.loadingStateChanged.next( false );
        console.log(error);
        this.snackBarService.showSnackBar(error.message, 'OK', true);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next( true );
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then( result => {
      this.uiService.loadingStateChanged.next( false );
      console.log(result);
    })
    .catch( error => {
      this.uiService.loadingStateChanged.next( false );
      console.log(error);
      this.snackBarService.showSnackBar(error.message, 'OK', true);
    });
}

  logout() {
    this.afAuth.signOut(); // get ride of the authentication token
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
