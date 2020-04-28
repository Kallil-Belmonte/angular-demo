import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { NewsService } from 'app/pages/news/news.service';

@Component({
  selector: 'app-delete-post-modal',
  templateUrl: './delete-post-modal.component.html',
  styleUrls: []
})
export class DeletePostModalComponent implements OnInit {

  isLoading: boolean = false;
  closeResult = '';
  @Input() open: boolean;
  @Output() closeModal = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private newsService: NewsService) { }

  ngOnInit() {
  }

  //==============================
  // GENERAL METHODS
  //==============================

  // DELETE CURRENT POST
  deleteCurrentPost(id: string): void {
    this.newsService.deleteCurrentPost(id).subscribe(
      () => {
        this.closeModal.emit();
        this.isLoading = false;
        this.router.navigate(['/blog']);
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  // PARAMETER LISTENER
  parameterListener(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.deleteCurrentPost(params['id']);
      }
    );
  }

  // ON DELETE POST
  onDeletePost(): void {
    this.isLoading = true
    this.parameterListener();
  }

  // ON CLICK OUT MODAL
  onClickOutModal(event: any): void {
    if (event.target.id === 'deletePost') {
      this.closeModal.emit();
    }
  }

  // ON CLOSE MODAL
  onCloseModal(): void {
    this.closeModal.emit();
  }

}
