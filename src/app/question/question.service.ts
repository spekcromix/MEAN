import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Question } from './question.model';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Answer } from '../answer-form/answer.model';

@Injectable()
export class QuestionService {
  private questionsUrl: string;

  constructor(private http: HttpClient) {
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
    console.log(this.questionsUrl);
  }

  getQuestions(sort = '-createdAt'): Observable<Question[]> {
    return this.http.get(`${ this.questionsUrl }?sort=${ sort }`).pipe(
      map(resp => {
        console.log(resp);
        return resp as Question[];
      })
    );
  }

  getQuestion(id): Observable<Question> {
    const url = urljoin(this.questionsUrl, id);
    return this.http.get(url).pipe(
      map(resp => {
        return resp as Question;
      })
    );
  }

  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  addQuestion(question: Question) {
    const body = JSON.stringify(question);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.getToken();

    return this.http.post(this.questionsUrl + token, body, { headers }).pipe(
      map((response: Response) => response),
      catchError((error: Response) => Observable.throw(error))
    );
  }

  addAnswer(answer: Answer) {
    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    };
    const body = JSON.stringify(a);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = urljoin(
      this.questionsUrl,
      answer.question._id.toString(),
      'answers'
    );
    const token = this.getToken();

    return this.http.post(url + token, body, { headers }).pipe(
      map((response: Response) => response),
      catchError((error: Response) => Observable.throw(error))
    );
  }

  handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';

    console.log(errMsg);
  }
}
