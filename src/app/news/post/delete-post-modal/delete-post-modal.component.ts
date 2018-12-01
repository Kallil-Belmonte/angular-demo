import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-post-modal',
  templateUrl: './delete-post-modal.component.html',
  styleUrls: []
})
export class DeletePostModalComponent implements OnInit {
  @Input() open: boolean;
  @Output() closeModal = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // ON DELETE POST
  onDeletePost(): void {

  }


  // ON CLOSE MODAL
  onCloseModal(): void {
    this.closeModal.emit();
  }
}
