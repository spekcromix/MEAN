import { Component, OnInit, Input } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  @Input() sort = '-createdAt';
  questions: Question[];
  loading = true;

  constructor(private _questionS: QuestionService) {}

  ngOnInit() {
    this._questionS.getQuestions(this.sort).subscribe((questions: Question[]) => {
      this.questions = questions;
      this.loading = false;
    });
  }
}
