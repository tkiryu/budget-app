import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';


@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return Observable.of(null).mergeMap(() => {
      // authenticate
      if (req.url.endsWith('/api/login') && req.method === 'POST') {
        // find if any user matches login credentials
        const filteredUsers = users.filter(user => {
          return (
            user.email === req.body.email &&
            user.password === req.body.password
          );
        });

        if (!filteredUsers.length) {
          return Observable.throw('email or password is incorrect');
        }

        // if login details are valid return 200 OK with user details and fake jwt token
        const user = filteredUsers[0];
        const body = {
            id: user.id,
            userName: user.userName,
            displayName: user.displayName,
            email: user.email,
            token: 'mock-jwt-token'
        };

        return Observable.of(new HttpResponse({ status: 200, body }));
      }

      // create user
      if (req.url.endsWith('/api/register') && req.method === 'POST') {
        // get new user object from post body
        const newUser = req.body;

        // validation
        const duplicateUser = users.some(user => user.email === newUser.email);
        if (duplicateUser) {
          return Observable.throw('email "' + newUser.email + '" is already taken');
        }

        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK
        return Observable.of(new HttpResponse({ status: 200 }));
      }

      // pass through any reqs not handled above
      return next.handle(req);

    })
    // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
    .materialize()
    .delay(250)
    .dematerialize();
  }
}
