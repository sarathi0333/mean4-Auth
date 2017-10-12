import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as AppUtil from '../common/app.utils';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  createAccount(user) {
    return this.http.post('users/register', user)
    .map(resp => resp.json());
  }

  auth(user) {
    return this.http.post('users/auth', user)
    .map(res => res.json());
  }

  saveUserData(token, user) {
    localStorage.setItem(AppUtil.AUTH_TOKEN, token);
    localStorage.setItem(AppUtil.USER_INFO, JSON.stringify(user));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(AppUtil.AUTH_TOKEN);
  }

  logout() {
    localStorage.removeItem(AppUtil.AUTH_TOKEN);
    localStorage.removeItem(AppUtil.USER_INFO);
  }
}
