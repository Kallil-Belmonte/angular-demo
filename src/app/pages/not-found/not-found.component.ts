import { Component, OnInit } from '@angular/core';

import { PAGE_TITLE } from 'app/shared/files/consts';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.setPageTitle();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // SET PAGE TITLE
  setPageTitle(): void {
    document.title = `${PAGE_TITLE} Error 404`;
  }

}
