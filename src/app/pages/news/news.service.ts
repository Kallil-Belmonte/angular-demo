import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment, endpoints } from 'environments/environment';
import { PostModel } from 'app/pages/news/_models/post.model';
import { CategoryModel } from 'app/pages/news/_models/category.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }


	//==============================
  // BLOG
  //==============================

  // GET POSTS
  getPosts(): Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>(environment.jsonPlaceholder + endpoints.blog.posts);
  }

  // GET CATEGORIES
  getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(environment.mocky + endpoints.blog.categories);
  }


  //==============================
  // POST
  //==============================

  // GET CURRENT POST
  getCurrentPost(id: string): Observable<PostModel> {
    return this.httpClient.get<PostModel>(environment.jsonPlaceholder + endpoints.blog.posts + id);
  }

  // EDIT CURRENT POST
  editCurrentPost(id: number, payload: { title: string, body: string }): Observable<PostModel> {
    return this.httpClient.put<PostModel>(environment.jsonPlaceholder + endpoints.blog.posts + id, payload);
  }

  // DELETE CURRENT POST
  deleteCurrentPost(id: string): Observable<PostModel> {
    return this.httpClient.delete<PostModel>(environment.jsonPlaceholder + endpoints.blog.posts + id);
  }

}
