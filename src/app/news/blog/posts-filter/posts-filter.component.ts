import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss']
})
export class PostsFilterComponent implements OnInit {
  @Output() filterPosts = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // ON SELECT POSTS FILTER
  onSelectPostsFilter() {
    this.filterPosts.emit();
  }
}
