import { Injectable } from '@angular/core';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
  userUrl: string;
  currentUser?: User;
  constructor(
    private http: HttpClient,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.userUrl = urljoin(environment.apiUrl, 'auth');

    if (this.isLoggedIn()) {
      const { userId, email, lastName, firstName } = JSON.parse(
        localStorage.getItem('user')
      );
      this.currentUser = new User(email, null, firstName, lastName, userId);
    }
  }

  signUp(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(urljoin(this.userUrl, 'signup'), body, { headers })
      .pipe(
        map((resp: any) => {
          const json = resp;
          this.login(json);
          console.log(json);
          return json;
        })
      );
  }

  signIn(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(urljoin(this.userUrl, 'signin'), body, { headers })
      .pipe(
        map((resp: any) => {
          const json = resp;
          this.login(json);
          return json;
        })
      );
  }

  login = ({ token, userId, firstName, lastName, email }) => {
    this.currentUser = new User(email, null, firstName, lastName, userId);
    localStorage.setItem('token', token);
    localStorage.setItem(
      'user',
      JSON.stringify({ userId, firstName, lastName, email })
    );
    this.router.navigate(['/']);
  };

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/signin');
  }

  showError(message) {
    this.snackBar.open(message, 'x', { duration: 2500 });
  }

  public handleError = (error: any) => {
    const { error: message } = error;

    if (message === 'TokenExpiredError') {
      this.showError('Tu sesión ha expirado');
    } else if (message === 'JsonWebTokenError') {
      this.showError('Ha habido un problema con tu sesión');
    } else {
      this.showError(message || 'Ha ocurrido un error. Inténtalo nuevamente');
      this.logout();
    }
  };
}
