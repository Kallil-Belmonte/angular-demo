import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-posts-per-page',
  templateUrl: './posts-per-page.component.html',
  styleUrls: ['./posts-per-page.component.scss']
})
export class PostsPerPageComponent implements OnInit {

  @Input() postsPerPage: number;
  @Output() onChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
