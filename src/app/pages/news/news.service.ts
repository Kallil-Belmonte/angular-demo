import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment, endpoints } from 'environments/environment';
import { PostModel } from 'app/pages/news/_models/post.model';
import { CategoryModel } from 'app/pages/news/_models/category.model';

const { jsonPlaceholder, mocky } = environment;
const { blog } = endpoints;

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
    return this.httpClient.get<PostModel[]>(`${jsonPlaceholder}${blog.posts}`);
  }

  // GET CATEGORIES
  getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(`${mocky}${blog.categories}`);
  }


  //==============================
  // POST
  //==============================

  // GET CURRENT POST
  getCurrentPost(id: string): Observable<PostModel> {
    return this.httpClient.get<PostModel>(`${jsonPlaceholder}${blog.posts}${id}`);
  }

  // EDIT CURRENT POST
  EditPost(id: number, payload: { title: string, body: string }): Observable<PostModel> {
    return this.httpClient.put<PostModel>(`${jsonPlaceholder}${blog.posts}${id}`, payload);
  }

  // DELETE CURRENT POST
  deleteCurrentPost(id: string): Observable<PostModel> {
    return this.httpClient.delete<PostModel>(`${jsonPlaceholder}${blog.posts}${id}`);
  }

}
