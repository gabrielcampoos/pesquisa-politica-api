import { Result, ResultDTO } from "../../../shared/utils";
import { QuestionRepository } from "../repository";

export class GetIdQuestionUsecase {
  async execute(id: string): Promise<ResultDTO> {
    const repository = new QuestionRepository();

    const getIdQuestion = await repository.findQuestionById(id);

    if (!getIdQuestion) return Result.error(400, "Pergunta não encontrado.");

    return Result.success(
      200,
      "Pergunta encontrada com sucesso.",
      getIdQuestion.toJSON()
    );
  }
}
