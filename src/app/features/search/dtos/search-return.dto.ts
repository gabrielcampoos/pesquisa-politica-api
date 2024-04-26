import { Search } from "../../../models";
import { Question } from "../../../models/Question";

export interface SearchReturnDTO {
  data: {
    search: Search;
    question: Question;
  };
}
