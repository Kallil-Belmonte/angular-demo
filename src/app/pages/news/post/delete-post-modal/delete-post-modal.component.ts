import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { NewsService } from 'app/pages/news/news.service';

@Component({
  selector: 'app-delete-post-modal',
  templateUrl: './delete-post-modal.component.html',
  styleUrls: [],
})
export class DeletePostModalComponent implements OnInit {
  loading: boolean = false;
  closeResult = '';
  @Input() open: boolean;
  @Output() closeModal = new EventEmitter();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
  ) {}

  ngOnInit() {}

  //==============================
  // METHODS
  //==============================

  deleteCurrentPost(id: string): void {
    this.newsService.deleteCurrentPost(id).subscribe(
      () => {
        this.closeModal.emit();
        this.loading = false;
        this.router.navigate(['/blog']);
      },
      error => {
        console.error(error);
        this.loading = false;
      },
    );
  }

  parameterListener(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.deleteCurrentPost(params['id']);
    });
  }

  onDeletePost(): void {
    this.loading = true;
    this.parameterListener();
  }

  onClickOutModal(event: any): void {
    if (event.target.id === 'deletePost') {
      this.closeModal.emit();
    }
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
