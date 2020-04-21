import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserModel } from 'app/account/_models/user.model';

type accountState = {
  userData: UserModel,
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  fullName: string;

  constructor(private store: Store<accountState>) { }

  ngOnInit() {
    this.getUserData();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // GET USER DATA
  getUserData(): void {
    // Get User Data from reducer
    this.store.select('userData').subscribe(
      (state: UserModel) => {
        const { firstName, lastName } = state;
        this.fullName = `${firstName} ${lastName}`;
      }
    );
  }

}
