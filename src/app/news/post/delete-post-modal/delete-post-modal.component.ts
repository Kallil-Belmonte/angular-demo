import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { NewsService } from 'app/news/news.service';

@Component({
  selector: 'app-delete-post-modal',
  templateUrl: './delete-post-modal.component.html',
  styleUrls: []
})
export class DeletePostModalComponent implements OnInit {

  loading: boolean = false;
  closeResult = '';
  @Input() open: boolean;
  @Output() closeModal = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private newsService: NewsService,
              private modalService: NgbModal) { }

  ngOnInit() {
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // DELETE CURRENT POST
  deleteCurrentPost(id: string): void {
    this.newsService.deleteCurrentPost(id).subscribe(
      () => {
        // Close modal
        this.closeModal.emit();

        // Deactivate loader
        this.loading = false;

        // Redirect
        this.router.navigate(['/blog']);
      },
      error => {
        console.error(error);

        // Deactivate loader
        this.loading = false;
      }
    );
  }


  // PARAMETER LISTENER
  parameterListener(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        // Delete current post
        this.deleteCurrentPost(params['id']);
      }
    );
  }


  // ON DELETE POST
  onDeletePost(): void {
    // Activate loader
    this.loading = true

    // Parameter listener
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

  private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return `with: ${reason}`;
   }
 }

  onOpenModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
