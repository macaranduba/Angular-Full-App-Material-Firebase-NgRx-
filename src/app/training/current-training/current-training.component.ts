import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0;
  timerId: number;

  constructor() { }

  ngOnInit(): void {
    this.timerId = setInterval( () => {
      this.progress += 20; // increment percentage done per second
      if( this.progress >= 100 ) {
        clearInterval( this.timerId );
      }
    }, 1000);
  }

  onStopTimer() {
    if ( this.timerId ) {
      clearInterval( this.timerId );
    }
  }

  ngOnDestroy() {
    this.onStopTimer();
  }
}
