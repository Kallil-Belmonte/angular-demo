import { Component, OnInit, Input } from '@angular/core';

import { PostModel } from 'app/pages/news/_models/post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  @Input() post: PostModel;

  constructor() { }

  ngOnInit() {
  }

}
