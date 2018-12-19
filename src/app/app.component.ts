import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Utils } from 'app/shared/utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {

  pageTitle: string = 'Angular Demo | ';

  public constructor(private router: Router,
                     private title: Title) { }

  ngOnInit() {
    this.setPageTitle();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // SET PAGE TITLE
  setPageTitle(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {

        if (event.url === '/') {
          this.title.setTitle(this.pageTitle + 'Home');
        } else {
          let pageUrl = event.url;
          let urlName = Utils.capitalizeFirstLetter(pageUrl.split('/')[1]);

          this.title.setTitle(this.pageTitle + urlName);
        }

      }
    });
  }

}
