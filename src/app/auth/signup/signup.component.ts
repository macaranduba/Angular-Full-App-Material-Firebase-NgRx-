import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate = undefined; // max birth date so that user must have, at least, 18 years old
  public signInLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit(): void {
    this.signInLoading$ = this.uiService.loadingStateChanged.asObservable();

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    console.log("SignupComponent.onSubmit()", form);
    this.authService.registerUser( {
      email: form.value.email, // form.value.<name HTML element attribute value>
      password: form.value.password
    } );
  }
}
