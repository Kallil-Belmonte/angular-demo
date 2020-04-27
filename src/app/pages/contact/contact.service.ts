import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment, endpoints } from 'environments/environment';

const { mocky } = environment;
const { contactForm } = endpoints;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }


	//==============================
  // CONTACT
  //==============================

  // GET FAVORITE COLORS
  getFavoriteColors(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${mocky}${contactForm.favoriteColors}`);
  }

}
