import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blog-pagination',
  templateUrl: './blog-pagination.component.html',
  styleUrls: [],
})
export class BlogPaginationComponent implements OnInit {
  @Input() pages: number[] = [];
  @Input() firstItem: number = 1;
  @Input() maxItem: number;
  @Input() currentPage: number;
  @Output() onPaginate = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  //==============================
  // METHODS
  //==============================

  get startPages(): number {
    return this.firstItem - 1;
  }

  get endPages(): number {
    return this.startPages + this.maxItem;
  }

  get pageItems() {
    return this.pages.slice(this.startPages, this.endPages);
  }

  isItemActive(page: any): boolean {
    return Number(page) === this.currentPage;
  }
}
