import { Answer } from '../answer-form/answer.model';

export class Question {
  _id?: String;
  title: String;
  description: String;
  createdAt?: Date;
  icon?: String;
  answers: Answer[];

  constructor(
    title: String,
    description: String,
    createdAt?: Date,
    icon?: String
  ) {
    this._id = '1';
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.icon = icon;
    this.answers = [];
  }
}
