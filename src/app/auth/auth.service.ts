import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  public token: string;

  private registerUrl = '/api/register';
  private loginUrl = '/api/login';

  userProfile: Object;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  isAuthenticated(): boolean {
    return true;
  }

  // TODO
  // getUser$ = this.http
  //   .get<User>(`${this.usersUrl}/1`)
  //   .do(user => this.store.set('user', user));

  register(email: string, password: string) {
    return this.http
      .post(this.registerUrl, { email, password })
      .map((user: any) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  // TODO
  login(email: string, password: string) {
    return this.http
      .post(this.loginUrl, { email, password })
      .map((user: any) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.token = null;
  };
}
