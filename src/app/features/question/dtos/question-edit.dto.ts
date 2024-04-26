import { AnswerEnum } from "../../../shared/enums";

export interface EditQuestionDTO {
  id: string;
  question: string;
  answer: AnswerEnum;
}
