import { Component, OnInit, Input } from '@angular/core';

import { faHome, faNewspaper, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit() {
  }

}
