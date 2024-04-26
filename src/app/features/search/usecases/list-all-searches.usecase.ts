import { Result, ResultDTO } from "../../../shared/utils";
import { SearchFilterDTO } from "../dtos";
import { SearchRepository } from "../repository";

export class ListAllSearchesUsecase {
  async execute(data: SearchFilterDTO): Promise<ResultDTO> {
    const searchRepository = new SearchRepository();

    const searchFound = await searchRepository.searchListByDistrict(
      data.district,
      data.idSearch
    );

    if (!searchFound) return Result.error(400, "Bairro não encontrado.");

    const getIdSearch = await searchRepository.findSearchById(data.idSearch);

    if (!getIdSearch) return Result.error(400, "Pesquisa não encontrada.");

    const questionFound = await searchRepository.findQuestions(
      getIdSearch.toJSON().id
    );

    return Result.error(400, "Deu ruim");
  }
}
