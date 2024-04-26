import { Question, QuestionJSON } from "../../../models/Question";
import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Result, ResultDTO } from "../../../shared/utils";
import { QuestionFilterDTO } from "../dtos/question-filter.dto";
import { QuestionRepository } from "../repository";

const PREFIX_CACHE = "list-all-questions";

export class ListAllQuestionUsecase {
  async execute(data: QuestionFilterDTO): Promise<ResultDTO> {
    const { district } = data;

    const questionRepository = new QuestionRepository();
    const cacheRepository = new CacheRepository();

    const questionCache = await cacheRepository.get<QuestionJSON[]>(
      `${PREFIX_CACHE}`
    );
    let questions: QuestionJSON[] = [];

    if (!questionCache) {
      const mainQuestion = await questionRepository.listQuestionsByDistrict(
        district
      );

      questions = mainQuestion.map((question) => question.toJSON());

      await cacheRepository.set<QuestionJSON[]>(`${PREFIX_CACHE}`, questions);
    } else {
      questions = questionCache;
    }

    const groupedQuestions: { [idSearch: string]: QuestionJSON[] } = {};

    questions.forEach((question) => {
      if (groupedQuestions[question.idSearch.id]) {
        groupedQuestions[question.idSearch.id].push(question);
      } else {
        groupedQuestions[question.idSearch.id] = [question];
      }
    });

    return Result.success(200, "Perguntas listadas.", groupedQuestions);
  }
}
