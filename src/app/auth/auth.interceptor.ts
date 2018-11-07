import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const copiedReq = req.clone({
			headers: req.headers.append('', '')
		});

		return next.handle(copiedReq);
	}

	// ADD TOKEN
	// addToken(req: HttpRequest<any>): HttpRequest<any> {
	// 	return req.clone({
	// 		setHeaders: {
	// 			'Content-Type': 'application/json',
	// 			'Authorization': 'Bearer ' +  window.sessionStorage.getItem('tokenQuartile')
	// 		}
	// 	});
	// }


	// INTERCEPT
	// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	// 	return next.handle(this.addToken(req)).pipe(
	// 		catchError(error => {
	//
	// 			if (error instanceof HttpErrorResponse) {
	//
	// 				switch ((<HttpErrorResponse>error).status) {
	// 					case 0:
	// 						return this.handleRequestError();
	// 					case 400:
	// 						return this.handle400Error(error);
	// 					case 401:
	// 						return this.handle401Error(error, req, next);
	// 					case 500:
	// 						return this.handle500Error(error);
	// 				}
	//
	// 			} else {
	// 				return Observable.throw(error);
	// 			}
	//
	// 		}) as any
	// 	);
	// }

}
