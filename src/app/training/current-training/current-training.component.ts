import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponent } from './stop-traning.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
	@Output() trainingExit = new EventEmitter<void>();
  progress = 0; // percentage
  timerId: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  private startOrResumeTimer() {
    this.timerId = setInterval( () => {
      this.progress += 20; // increment percentage done per second
      if( this.progress >= 100 ) {
        clearInterval( this.timerId );
      }
    }, 1000);
  }

  onStopTimer() {
    this.stopTimer();
    const dialogRef = this.dialog.open( StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe( result => {
			console.info('CurrentTrainingComponent.dialogRef.afterClosed = ', result);
			if( result ) {
				this.trainingExit.emit();
			} else {
        this.startOrResumeTimer();
      }
    });
  }

  private stopTimer() {
    if ( this.timerId ) {
      clearInterval( this.timerId );
      this.timerId = null;
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
