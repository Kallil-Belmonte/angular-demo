import { Component, OnInit, Input } from '@angular/core';

import { faHome, faNewspaper, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faHome = faHome;
  faNewspaper = faNewspaper;
  faEnvelope = faEnvelope;
  faUser = faUser;
  @Input() userFullName: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // ON LOG OUT
  onlogOut(): void {
    this.authService.logOut();
  }
}
