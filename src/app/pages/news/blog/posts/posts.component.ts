import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: []
})
export class PostsComponent implements OnInit {

  @Input() pages: object;
  @Input() currentPage: number;

  constructor() { }

  ngOnInit() {
  }

}
