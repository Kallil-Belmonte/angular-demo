import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { AppState } from 'app/core/ngrx/reducers/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  fullName: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.getUserData();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // GET USER DATA
  getUserData(): void {
    // Get User Data from reducer
    this.store.pipe(select((state: AppState) => state)).subscribe(
      ({ userData: { firstName, lastName } }) => {
        this.fullName = `${firstName} ${lastName}`;
      }
    );
  }

}
