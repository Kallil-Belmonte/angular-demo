import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: []
})
export class PaginationComponent implements OnInit {

  @Input() firstItem: number = 1;
  secondItem: number;
  thirdItem:  number;
  fourthItem: number;
  fifthItem:  number;
  @Input() totalItems: number;
  @Output() paginate = new EventEmitter();

  constructor() { }

  ngOnChanges() {
    this.setItemsValues();
  }

  ngOnInit() {
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // SET ITEMS VALUES
  setItemsValues(): void {
    this.secondItem = this.firstItem + 1;
    this.thirdItem  = this.firstItem + 2;
    this.fourthItem = this.firstItem + 3;
    this.fifthItem  = this.firstItem + 4;
  }


  // ON CLICK PAGINATION
  onClickPagination(): void {
    this.paginate.emit();
  }

}
