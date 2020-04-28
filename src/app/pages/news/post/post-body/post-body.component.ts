import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PostModel } from 'app/pages/news/_models/post.model';

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.scss']
})
export class PostBodyComponent implements OnInit {

  @Input() data: PostModel;
  @Output() openModal = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

	//==============================
  // GENERAL METHODS
  //==============================

  // ON CLICK DELETE
  onClickDelete(): void {
    this.openModal.emit();
  }

}
