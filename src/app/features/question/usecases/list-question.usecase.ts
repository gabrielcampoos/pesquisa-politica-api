import { Question } from "../../../models/Question";
import { Result, ResultDTO } from "../../../shared/utils";
import { QuestionRepository } from "../repository";

export class ListQuestionUsecase {
  async execute(): Promise<ResultDTO> {
    const questionRepository = new QuestionRepository();

    const listQuestions = await questionRepository.listQuestion();

    const groupedQuestions: { [idSearch: string]: Question[] } = {};

    listQuestions.forEach((question) => {
      if (groupedQuestions[question.toJSON().idSearch.id]) {
        groupedQuestions[question.toJSON().idSearch.id].push(question);
      } else {
        groupedQuestions[question.toJSON().idSearch.id] = [question];
      }
    });

    return Result.success(
      200,
      "Pesquisas listadas com sucesso.",
      listQuestions
    );
  }
}
