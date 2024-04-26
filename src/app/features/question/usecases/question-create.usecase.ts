import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Result, ResultDTO } from "../../../shared/utils";
import { SearchRepository } from "../../search/repository";
import { QuestionCreateDTO } from "../dtos";
import { QuestionRepository } from "../repository";

const PREFIX_CACHE = "list-all-questions";

export class QuestionCreateUsecase {
  async execute(data: QuestionCreateDTO): Promise<ResultDTO> {
    const searchRepository = new SearchRepository();
    const cacheRepository = new CacheRepository();

    const searchFound = await searchRepository.findSearchById(data.idSearch);

    if (!searchFound) return Result.error(400, "Pesquisa não encontrada.");

    const questionRepository = new QuestionRepository();

    const questionCreated = await questionRepository.questionCreate({
      idSearch: data.idSearch,
      question: data.question,
      answer: data.answer,
    });

    await cacheRepository.delete(`${PREFIX_CACHE}-${data.idSearch}`);
    await cacheRepository.delete(
      `${PREFIX_CACHE}-${questionCreated.toJSON().id}`
    );

    return Result.success(
      200,
      "Pesquisa criada com sucesso.",
      questionCreated.toJSON()
    );
  }
}
