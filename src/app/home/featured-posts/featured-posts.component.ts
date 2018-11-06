import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-featured-posts',
  templateUrl: './featured-posts.component.html',
  styleUrls: []
})
export class FeaturedPostsComponent implements OnInit {
  @Input() posts;

  constructor() { }

  ngOnInit() {
  }

}
