import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { UserModel } from 'app/account/_models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  fullName: string;

  constructor(private store: Store<{userData}>,
              private localStorage: LocalStorage) { }

  ngOnInit() {
    this.getUserData();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // GET USER DATA
  getUserData(): void {
    this.store.select('userData').subscribe(
      state => {
        if (Object.keys(state).length > 0) {
          this.localStorage.setItemSubscribe('userData', state);
        }

        this.localStorage.getItem('userData').subscribe(
          (data: UserModel) => {
            this.fullName = data.firstName + ' ' + data.lastName;
          }
        );
      }
    );
  }

}
