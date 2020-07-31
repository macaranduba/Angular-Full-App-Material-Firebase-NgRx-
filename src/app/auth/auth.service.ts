import { Subject } from 'rxjs';

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

export class AuthService {
  /**
   * true is it is signed in, false otherwise
   */
  authChange = new Subject<boolean>();
  private user: User; // undefined

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString(), // temp
    };
    this.authChange.next( true );
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString(), // temp
    };
    this.authChange.next( true );
  }

  logout() {
    this.user = null;
    this.authChange.next( false );

  }

  getUser() {
    return { ...this.user} ; // spread operator, spread the object properties on a new object, making a copy of it
    // this avoid that outside copy change our private object by reference
  }

  isAuth() {
    return this.user != null;
  }
}
