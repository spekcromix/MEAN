import Debug from 'debug';
import { Question, Answer } from '../models';

const debug = new Debug('platzi-overflow:db-api:question');

export default {
  findAll: (sort = '-createdAt') => {
    debug('Finding all questions');
    return Question.find().populate('answers').sort(sort)
  },

  findById: (_id) => {
    debug(`Find question with id ${_id}`);
    return Question
      .findOne({ _id })
      .populate({
        path: 'user',
        select: '-password'
      })
      .populate({
        path: 'answers',
        options: { sort: '-createdAt' },
        populate: {
          path: 'user',
          model: 'User',
          select: '-password'
        }
      });
  },

  create: (q) => {
    debug(`Creating new question ${q}`);
    const question = new Question(q);
    return question.save();
  },

  createAnswer: async (q, a) => {
    const answer = new Answer(a);
    const saveAnswer = await answer.save();
    q.answers.push(saveAnswer);
    await q.save();
    return saveAnswer;
  }
};
