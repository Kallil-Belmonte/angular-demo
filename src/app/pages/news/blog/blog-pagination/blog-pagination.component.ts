import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blog-pagination',
  templateUrl: './blog-pagination.component.html',
  styleUrls: []
})
export class BlogPaginationComponent implements OnInit {

  @Input() pages: number[] = [];
  @Input() firstItem: number = 1;
  @Input() maxItem: number;
  @Input() currentPage: number;
  @Output() onPaginate = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // DYNAMIC PROPERTIES
  get startPages(): number {
    return this.firstItem - 1;
  }

  get endPages(): number {
    return this.startPages + this.maxItem;
  }

  get pageItems() {
    return this.pages.slice(this.startPages, this.endPages);
  }

  // IS ITEM ACTIVE
  isItemActive(page: any): boolean {
    return Number(page) === this.currentPage;
  }

}
