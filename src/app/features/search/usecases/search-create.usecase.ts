import { Question } from "../../../models/Question";
import { CacheRepository } from "../../../shared/cache/cache.repository";
import { AnswerEnum } from "../../../shared/enums";
import { Result, ResultDTO } from "../../../shared/utils";
import { QuestionRepository } from "../../question/repository";
import { SearchRepository } from "../repository";

const PREFIX_CACHE = "list-all-searches";

type SearchCreate = {
  district: string;
  researcherName: string;
  researchedName: string;
};

export class SearchCreateUsecase {
  async execute(data: SearchCreate): Promise<ResultDTO> {
    const searchRepository = new SearchRepository();
    const cacheRepository = new CacheRepository();

    const searchCreated = await searchRepository.searchCreate({
      district: data.district,
      researcherName: data.researcherName,
      researchedName: data.researchedName,
    });

    await cacheRepository.delete(`${PREFIX_CACHE}`);

    return Result.success(200, "Pesquisa criada com sucesso.", searchCreated);
  }
}
