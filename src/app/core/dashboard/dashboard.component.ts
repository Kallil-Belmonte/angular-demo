import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { LocalStorage } from '@ngx-pwa/local-storage';

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

  constructor(private store: Store<accountState>,
              private localStorage: LocalStorage) { }

  ngOnInit() {
    this.getUserData();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // GET USER DATA
  getUserData(): void {
    // Get User Data Reducer
    this.store.select('userData').subscribe(
      state => {
        // If state is not empty, set/update User Data Reducer in local storage
        if (Object.keys(state).length) {
          this.localStorage.setItem('userData', state);
        }

        // Get User Data Reducer from local storage
        this.localStorage.getItem('userData').subscribe(
          (userData: UserModel) => {
            this.fullName = userData.firstName + ' ' + userData.lastName;
          }
        );
      }
    );
  }

}
