import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.redirectUser();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // REDIRECT USER
  redirectUser(): void {
    let authToken = sessionStorage.getItem('authTokenAngularDemo') || localStorage.getItem('authTokenAngularDemo');
    let expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateAngularDemo'));

    if (authToken && !expiredSession) {
      this.router.navigate(['/']);
    }
  }
}
