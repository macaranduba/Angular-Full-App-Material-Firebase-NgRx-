import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['endDatePiped', 'name', 'calories', 'duration', 'state']; // matColumnDef values bu the other in which they will be displayed
  dataSource = new MatTableDataSource<Exercise>();
  private subscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.subscription = this.trainingService.fetchCompletedOrCancelledExercises()
      .pipe(
        map( data => {
          return data.map( exercise => {
            let temp = {
              ...exercise,
              endDatePiped: this.datePipe.transform( exercise.endDate ),
              // we should also do the state i18n here...
            };
            delete temp.endDate;
            return temp;
          })
        }),
      )
      .subscribe( data => {
        this.dataSource.data = data;
        console.info("PastTrainingComponent.ngOnInit()", data);
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if( this.subscription ) {
      this.subscription?.unsubscribe();
    }
  }

  translateState(state: string) {
    let translatedState = '';
    switch( state ) {
      case 'cancelled': translatedState = 'Cancelado'; break;
      case 'completed': translatedState = 'Completo'; break;
      default: translatedState = '';
    }
    return translatedState;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase(); // angular material compares data source values in lower case fashion way
  }
}
