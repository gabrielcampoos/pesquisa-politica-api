import { QuestionJSON } from "../../../models/Question";
import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Result, ResultDTO } from "../../../shared/utils";
import { SearchRepository } from "../../search/repository";
import { QuestionFilterDTO } from "../dtos/question-filter.dto";
import { QuestionRepository } from "../repository";

const PREFIX_CACHE = "list-all-questions";

interface FilterIdDTO {
  idQuestion: string;
  idSearch: string;
}

export class ListQuestionByIdUsecase {
  async execute(data: FilterIdDTO): Promise<ResultDTO> {
    const { idQuestion, idSearch } = data;

    const searchRepository = new SearchRepository();
    const questionRepository = new QuestionRepository();
    const cacheRepository = new CacheRepository();

    const searchFound = await searchRepository.findSearchById(idSearch);

    if (!searchFound) return Result.error(400, "Bairro não encontrado.");

    const questionCache = await cacheRepository.get<QuestionJSON[]>(
      `${PREFIX_CACHE}-${idQuestion}`
    );

    if (!questionCache) {
      const question = await questionRepository.findQuestionById(
        idQuestion,
        idSearch
      );

      if (!question) return Result.error(400, "Perguntas não encontradas.");

      await cacheRepository.set(
        `${PREFIX_CACHE}-${idQuestion}`,
        question.toJSON()
      );

      return Result.success(200, "Pesquisas cadastradas", question.toJSON());
    }

    return Result.success(
      200,
      "Pesquisas em cache buscadas com sucesso.",
      questionCache
    );
  }
}
