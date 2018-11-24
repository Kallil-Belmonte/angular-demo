import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment, endpoints } from 'environments/environment';
import { PostModel } from 'app/news/_models/post.model';
import { CategoryModel } from 'app/news/_models/category.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }


	//==============================
  // BLOG
  //==============================

  // GET POSTS
  getPosts(): Observable<PostModel> {
    return this.httpClient.get<PostModel>(environment.jsonPlaceholder + endpoints.blog.posts);
  }

  // GET CATEGORIES
  getCategories(): Observable<CategoryModel> {
    return this.httpClient.get<CategoryModel>(environment.mocky + endpoints.blog.categories);
  }


  //==============================
  // POST
  //==============================

  // GET CURRENT POST
  getCurrentPost(id: string): Observable<PostModel> {
    return this.httpClient.get<PostModel>(environment.jsonPlaceholder + endpoints.blog.posts + id);
  }
}
