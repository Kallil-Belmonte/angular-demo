import { Component, OnInit } from '@angular/core';

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
    document.title = 'Angular Demo | Error 404';
  }

}
