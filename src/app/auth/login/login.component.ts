import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromApp from '../../app.reducer';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, public uiService: UIService, private store: Store<{ui: fromApp.State}>) { }

  ngOnInit(): void {
    this.store.subscribe( data => console.info("LoginComponent.ngOnInit() ", data) );

    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [ Validators.email, Validators.required ] }),
      password: new FormControl('', { validators: [ Validators.required ] }),
    });
  }

  onLogon() {
    console.log("LoginComponent.onLogon() ", this.loginForm);
    this.authService.login( {email: this.loginForm.value.email, password: this.loginForm.value.password } );
  }
}
