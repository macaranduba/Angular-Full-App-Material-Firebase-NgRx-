import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponent } from './stop-traning.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0; // percentage
  timerId: number;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  private startOrResumeTimer() {
    const step = (this.trainingService.getRunningExercise().duration / 100) * 1000; // milliseconds
    this.timerId = setInterval( () => {
      this.progress += 1; // increment percentage done per second
      if( this.progress >= 100 ) {
        this.trainingService.completeExercise();
        clearInterval( this.timerId );
      }
    }, step);
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
				this.trainingService.cancelExercise( this.progress );
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
