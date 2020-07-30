import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `
            <h1 mat-dialog-title>Tem certeza que deseja terminar o treino em curso?</h1>
            <mat-dialog-content>
              <p>Você já completou <strong>{{ passedData.progress }}%</strong> do treino!</p>
            </mat-dialog-content>
            <mat-dialog-actions>
            <button mat-button [mat-dialog-close]="true">Sim</button> <!-- [mat-dialog-close] can be any data besides boolean -->
            <button mat-button [mat-dialog-close]="false">Não</button>
            </mat-dialog-actions>
            `,

})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}
