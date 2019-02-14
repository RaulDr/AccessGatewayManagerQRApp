import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/model/user';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private storage: AsyncLocalStorage, private router: Router) {}

  submitCredentials(user: User): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.post('login/', user).subscribe(
        (res: any) => {
          // tslint:disable-next-line:no-shadowed-variable
          const user = new User();
          user.id = res.idUser;
          user.username = res.username;
          user.token = res.token;
          window.localStorage.setItem('token', user.token);
          this.setAuth(user).subscribe(() => {
            observer.next(true);
          });
        },
        (err) => {
          console.error(err);
          observer.next(false);
        },
      );
    });
  }

  checkAuth() {
    return new Observable<boolean>((observer) => {
      this.http.get('checkIsAuthenticated/').subscribe(
        (response) => {
          observer.next(true);
        },
        (err) => {
          this.logout();
          observer.next(false);
        },
      );
    });
  }

  setAuth(user: User): Observable<boolean> {
    return this.storage.setItem('user', user);
  }

  getAuth(): Observable<any> {
    return this.storage.getItem('user');
  }

  logout(): void {
    this.purgeAuth();
    this.router.navigate(['login']);
  }

  purgeAuth() {
    this.storage.clear().subscribe(() => {});
  }
}
