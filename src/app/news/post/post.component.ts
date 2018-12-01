import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostModel } from 'app/news/_models/post.model';
import { NewsService } from 'app/news/news.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: []
})
export class PostComponent implements OnInit {
  loading: boolean = true;
  isModalOpen: boolean = false;
  currentPost: PostModel;

  constructor(private activatedRoute: ActivatedRoute,
              private newsService: NewsService) { }

  ngOnInit() {
    this.parameterListener();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // GET CURRENT POST
  getCurrentPost(id): void {
    this.newsService.getCurrentPost(id).subscribe(
      data => {
        // Data
        this.currentPost = data;

        // Deactivate loader
        this.loading = false;
      },
      error => {
        console.log(error);

        // Deactivate loader
        this.loading = false;
      }
    );
  }


  // PARAMETER LISTENER
  parameterListener(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        // Get current post
        this.getCurrentPost(params['id']);
      }
    );
  }


  // ON OPEN MODAL
  onToggleModal(): void {
    // Toggle class on body
    if (!document.querySelector('body.modal-open')) {
      document.querySelector('body').classList.add('modal-open');
    } else {
      document.querySelector('body').classList.remove('modal-open');
    }

    // Toggle modal
    this.isModalOpen = !this.isModalOpen;
  }




//   // GET CURRENT POST
//   getCurrentPost() {
//     axios.get(ENDPOINTS.blog.posts + this.props.match.params.id)
//       .then((response) => {
//         // Handle get post
//         this.props.handleGetPost(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .then(() => {
//         // Deactivate loader
//         this.setState((prevState, props) => {
//           return {
//             loading: false
//           };
//         });
//       });
//   }
//
//
//   // HANDLE TOGGLE MODAL
//   handleToggleModal() {
//     this.setState((prevState, props) => {
//       return { isModalOpen: !this.state.isModalOpen }
//     });
//   }
//
//
//   // HANDLE DELETE POST
//   handleDeletePost() {
//     // Deactivate loader
//     this.setState((prevState, props) => {
//       return {
//         loading: true
//       };
//     });
//
//     axios.delete(ENDPOINTS.blog.posts + this.props.match.params.id)
//       .then((response) => {
//         // Redirect
//         this.props.history.push('/blog');
//       })
//       .catch((error) => {
//         console.log(error);
//
//         // Deactivate loader
//         this.setState((prevState, props) => {
//           return {
//             loading: false
//           };
//         });
//       });
//   }
// }
}
