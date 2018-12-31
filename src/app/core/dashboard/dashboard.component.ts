import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UserModel } from 'app/account/_models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  userDataState: Observable<UserModel>;

  constructor(private store: Store<{userData}>) { }

  ngOnInit() {
    this.getUserData();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // GET USER DATA
  getUserData(): void {
    this.userDataState = this.store.select('userData');
  }

}
