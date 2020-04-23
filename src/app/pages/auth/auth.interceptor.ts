import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.url.includes(environment.jsonPlaceholder)) {
			const authToken = sessionStorage.getItem('authTokenAngularDemo') || localStorage.getItem('authTokenAngularDemo');

			// Intercept and modify the request
			const copiedReq = req.clone({
				headers: req.headers.append('Authorization', `Bearer ${authToken}`)
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
