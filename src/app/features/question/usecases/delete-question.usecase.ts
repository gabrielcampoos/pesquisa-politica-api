import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Result, ResultDTO } from "../../../shared/utils";
import { SearchRepository } from "../../search/repository";
import { DeleteQuestionDTO } from "../dtos/question-delete.dto";
import { QuestionRepository } from "../repository";

const PREFIX_CACHE = "list-all-questions";

export class DeleteQuestionUsecase {
  async execute(data: DeleteQuestionDTO): Promise<ResultDTO> {
    const { id } = data;

    const questionRepository = new QuestionRepository();
    const cacheRepository = new CacheRepository();

    const question = await questionRepository.findQuestionById(id);

    if (!question) return Result.error(400, "Pergunta não encontrada.");

    questionRepository.deleteQuestion(id);

    await cacheRepository.delete(`${PREFIX_CACHE}-${id}`);

    return Result.success(
      200,
      "Pergunta excluida com sucesso.",
      question.toJSON()
    );
  }
}
