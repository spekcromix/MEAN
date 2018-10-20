import { Question } from '../question/question.model';
import { User } from '../auth/user.model';

export class Answer {
  constructor(
    public description: String,
    public question: Question,
    public createdAt?: Date,
    public user?: User
  ) {}
}