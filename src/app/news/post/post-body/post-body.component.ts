import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PostModel } from 'app/news/_models/post.model';

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.scss']
})
export class PostBodyComponent implements OnInit {
  @Input() data: PostModel;
  @Output() toggleModal = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // ON TOGGLE MODAL
  onClickDelete(): void {
    this.toggleModal.emit();
  }
}
