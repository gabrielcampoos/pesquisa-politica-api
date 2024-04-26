import { AnswerEnum } from "../../../shared/enums";

export interface QuestionCreateDTO {
  idSearch: string;
  question: string;
  answer: AnswerEnum;
}
