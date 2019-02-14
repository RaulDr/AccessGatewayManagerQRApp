import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/model/user';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: AsyncLocalStorage) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
    return next.handle(req);
  }
}
