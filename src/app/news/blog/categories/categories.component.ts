import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CategoryModel } from 'app/news/_models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: []
})
export class CategoriesComponent implements OnInit {
  @Input() data: CategoryModel[];
  @Output() selectCategory = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // ON CLICK CATEGORY
  onClickCategory(): void {
    this.selectCategory.emit();
  }
}
