import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from './question.model';
import icons from './icons';
import { QuestionService } from './question.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  icons: Object[] = icons;
  constructor(
    private _questionS: QuestionService,
    private router: Router,
    private _authS: AuthService
  ) {}

  ngOnInit() {
    if (!this._authS.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }
  }

  onSubmit(form: NgForm) {
    const q = new Question(
      form.value.title,
      form.value.description,
      new Date(),
      form.value.icon
    );
    this._questionS
      .addQuestion(q)
      .subscribe(
        ({ _id }: any) => this.router.navigate(['/questions'], _id),
        this._authS.handleError
      );
    form.resetForm();
  }

  getIconVersion(icon: any) {
    let version;
    if (icon.versions.font.includes('plain-wordmark')) {
      version = 'plain-wordmark';
    } else {
      version = icon.versions.font[0];
    }

    if (icon.name === 'illustrator') {
      version = icon.versions.svg[0];
    }

    return version;
  }
}
