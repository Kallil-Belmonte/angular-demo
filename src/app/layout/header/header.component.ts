import { Component, OnInit, Input } from '@angular/core';

import { faHome, faNewspaper, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

import { PROJECT_TITLE } from 'app/shared/files/consts';
import { AuthService } from 'app/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  projectTitle = PROJECT_TITLE;
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
  onLogOut(): void {
    this.authService.logOut();
  }

}
