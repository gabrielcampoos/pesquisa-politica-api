import { CacheRepository } from "../../../shared/cache/cache.repository";
import { AnswerEnum } from "../../../shared/enums";
import { Result, ResultDTO } from "../../../shared/utils";
import { SearchRepository } from "../../search/repository";
import { QuestionRepository } from "../repository";

const PREFIX_CACHE = "list-all-questions";

interface UpdateQuestionDTO {
  id: string;
  newData: {
    question?: string;
    answer?: AnswerEnum;
    createdAt?: Date;
  };
}

export class EditQuestionUsecase {
  async execute(data: UpdateQuestionDTO): Promise<ResultDTO> {
    const { id, newData } = data;

    const questionRepository = new QuestionRepository();
    const cacheRepository = new CacheRepository();

    const question = await questionRepository.findQuestionById(id);

    if (!question) return Result.error(400, "Pergunta não encontrada.");

    const updated = question.updateQuestion({
      question: newData.question,
      answer: newData.answer,
      createdAt: newData.createdAt,
    });

    await cacheRepository.delete(`${PREFIX_CACHE}-${id}`);

    if (!updated) return Result.error(400, "Pergunta não pode ser editada.");

    const questionJSON = question.toJSON();

    questionRepository.editQuestion({
      id,
      question: questionJSON.question,
      answer: questionJSON.answer,
    });

    return Result.success(200, "Pergunta editada com sucesso.", question);
  }
}
