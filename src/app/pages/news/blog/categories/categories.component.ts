import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CategoryModel } from 'app/pages/news/_models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: []
})
export class CategoriesComponent implements OnInit {

  activeCategory: string;
  @Input() categories: CategoryModel[];
  @Output() onSelectCategory = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

	//==============================
  // GENERAL METHODS
  //==============================

  // IS CATEGORY ACTIVE
  isCategoryActive(category: string): boolean {
    return this.activeCategory === category;
  }

  // SELECT CATEGORY
  selectCategory(category: string): void {
    this.activeCategory = category === this.activeCategory ? undefined : category;
    this.onSelectCategory.emit(category);
  }

}
