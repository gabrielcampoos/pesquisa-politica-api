import { AnswerEnum } from "../shared/enums";
import { Base } from "./Base";
import { Search, SearchJSON } from "./Search";

export interface QuestionJSON {
  id: string;
  idSearch: SearchJSON;
  question: string;
  answer: AnswerEnum;
  createdAt: Date;
}

interface UpdateQuestionDTO {
  question?: string;
  answer?: AnswerEnum;
  createdAt?: Date;
}

export class Question extends Base {
  constructor(
    _id: string,
    private _question: string,
    private _answer: AnswerEnum,
    _createdAt: Date,
    private _idSearch: Search
  ) {
    super(_id, _createdAt);
  }

  toJSON(): QuestionJSON {
    return {
      id: this._id,
      idSearch: this._idSearch.toJSON(),
      question: this._question,
      answer: this._answer,
      createdAt: this._createdAt,
    };
  }

  updateQuestion(newData: UpdateQuestionDTO): boolean {
    if (newData.question) {
      this._question = newData.question;
    }

    if (newData.answer) {
      this._answer = newData.answer;
    }

    if (newData.createdAt) {
      this._createdAt = newData.createdAt;
    }

    return true;
  }
}
