import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authToken = sessionStorage.getItem('tokenAngularDemo') || localStorage.getItem('tokenAngularDemo');

		if (authToken) {
			// Intercept and modify the request
			const copiedReq = req.clone({
				headers: req.headers.append('Authorization', authToken)
			});

			// Continue with the modified request
			return next.handle(copiedReq);
		}
		else {
			// Continue with the original request
			return next.handle(req);
		}
	}

};
