import { Result, ResultDTO } from "../../../shared/utils";
import { SearchRepository } from "../repository";

export class ListSearchesUsecase {
  async execute(idSearch: string): Promise<ResultDTO> {
    const searchRepository = new SearchRepository();

    const searchFound = await searchRepository.findSearchById(idSearch);

    if (!searchFound) return Result.error(400, "Pesquisa não encontrada.");

    const questionsFound = await searchRepository.findQuestions(idSearch);

    if (!questionsFound) return Result.error(400, "Perguntas não encontradas.");

    const newSearch = {
      search: searchFound,
      questions: questionsFound,
    };

    return Result.success(200, "Pesquisa listada com sucesso.", newSearch);
  }
}
