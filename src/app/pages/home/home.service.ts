import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment, endpoints } from 'environments/environment';
import { PostModel } from 'app/pages/news/_models/post.model';

const { jsonPlaceholder } = environment;
const { blog } = endpoints;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }


	//==============================
  // HOME
  //==============================

  // GET FEATURED POSTS
	getFeaturedPosts(): Observable<PostModel> {
		return this.httpClient.get<PostModel>(`${jsonPlaceholder}${blog.posts}`);
	}

}
