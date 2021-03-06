import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { PROJECT_TITLE } from 'app/shared/files/consts';
import * as Helpers from 'app/shared/helpers';

const { capitalizeFirstLetter } = Helpers;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  public constructor(private router: Router, private title: Title) {}

  ngOnInit() {
    this.setPageTitle();
  }

  //==============================
  // METHODS
  //==============================

  setPageTitle(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.title.setTitle(`${PROJECT_TITLE} | Home`);
        } else {
          const pageUrl = event.url.split('-').join(' ');
          const urlName = capitalizeFirstLetter(pageUrl.split('/')[1]);

          this.title.setTitle(`${PROJECT_TITLE} | ${urlName}`);
        }
      }
    });
  }
}
