import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

	constructor(private snackBar: MatSnackBar) { }
	
	showSnackBar(msg: string, action: string, isError: boolean) {
		let config = new MatSnackBarConfig();
		config.duration = 2500;
		config.panelClass = [isError? 'snack_error' : 'snack_ok']; // classes globais, presentes no src/styles.css
		//config.verticalPosition = 'top';
		this.snackBar.open(msg, action, config); // mensagem, actions/butões, config
	}
}

/*
.snack_ok {
	background: darkseagreen;
	color: black;
}

.snack_error {
	background: pink;
	color: black;
}
*/
