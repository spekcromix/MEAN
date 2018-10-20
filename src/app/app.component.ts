import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzi-overflow';
  constructor(private _authS: AuthService) {}

  isLoggedIn() {
    return this._authS.isLoggedIn();
  }

  fullName() {
    return this._authS.currentUser.fullName();
  }

  logout() {
    this._authS.logout();
  }
}
