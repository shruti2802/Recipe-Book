import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {LocalStorageConstant} from '../shared/enum/local-storage-constant.enum';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../shared/component/unsubscribe/unsubscribe.component';

@Injectable()
export class AuthService extends UnsubscribeAbstract {

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  currentUser = new Subject<User>();

  signUp(data: object) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, {
      ...data,
      emailSecureToken: true
    });
  }

  createSpace(email: string, username: string, id: string) {
    this.http.get(`${environment.baseUrl}/users.json`).pipe(takeUntil(this.destroyed$)).subscribe((value: []) => {
      const users = value || [];
      // @ts-ignore
      users.push({email, username, id});
      this.http.put(`${environment.baseUrl}/users.json`, users).pipe(takeUntil(this.destroyed$)).subscribe();
    });
  }

  login(data: object) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      {
      ...data,
      emailSecureToken: true
    });
  }

  getCurrentUser() {
    let user: User;
    this.http.get(`${environment.baseUrl}/users.json`).pipe(takeUntil(this.destroyed$)).subscribe((value: User[]) => {
      if (!!value) {
        user = value.find(x => x.id === localStorage.getItem(LocalStorageConstant.token));
      }
      if (!user) {
        localStorage.removeItem(LocalStorageConstant.token);
        this.router.navigate(['/auth']);
      }
      this.currentUser.next(user);
    });
  }

  handleError(errorRes) {
    let message = 'An unknown error occurred';
    if (errorRes.error.hasOwnProperty('error') && errorRes.error.error.hasOwnProperty('message')) {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          message = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          message = 'This email does not exist.';
          break;
        case 'INVALID_PASSWORD':
          message = 'Incorrect password.';
          break;
        case 'WEAK_PASSWORD':
          message = 'Password should be at least 6 characters long.';
          break;
      }
    }
    return message;
  }
}




export interface User {
  email: string;
  username: string;
  id: string;
}
