import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authToken = sessionStorage.getItem('tokenAngularDemo') || localStorage.getItem('tokenAngularDemo');

		// Intercept the request
		const copiedReq = req.clone({
			headers: req.headers.append('Authorization', authToken)
		});

// console.log('Interceptor', copiedReq);

		// Continue the request
		return next.handle(copiedReq);
	}

};
