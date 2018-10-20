import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: ['./signup-screen.component.css']
})
export class SignupScreenComponent implements OnInit {
  signupForm: FormGroup;
  hide = true;
  passwordNotEqual = false;

  constructor(private _authS: AuthService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (
      this.signupForm.valid &&
      this.signupForm.value.password === this.signupForm.value.password2
    ) {
      const { firstName, lastName, email, password } = this.signupForm.value;
      const user = new User(email, password, firstName, lastName);
      this.passwordNotEqual = false;
      this._authS.signUp(user).subscribe(
        this._authS.login,
        this._authS.handleError
      )
    }
    if (
      this.signupForm.valid &&
      this.signupForm.value.password !== this.signupForm.value.password2
    ) {
      this.passwordNotEqual = true;
    }
  }
}
