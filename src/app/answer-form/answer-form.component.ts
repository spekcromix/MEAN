import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from './answer.model';
import { Question } from '../question/question.model';
import { User } from '../auth/user.model';
import { QuestionService } from '../question/question.service';
import SweetScroll from 'sweet-scroll';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent {
  @Input()
  question: Question;
  sweetScroll: SweetScroll;

  constructor(
    private _questionS: QuestionService,
    private _authS: AuthService,
    private router: Router
  ) {
    this.sweetScroll = new SweetScroll();
  }

  onSubmit(form: NgForm) {
    if (!this._authS.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }
    const answer = new Answer(form.value.description, this.question);
    this._questionS.addAnswer(answer).subscribe((a: any) => {
      this.question.answers.unshift(a), this.sweetScroll.to('#title');
    }, this._authS.handleError);

    form.reset();
  }
}
