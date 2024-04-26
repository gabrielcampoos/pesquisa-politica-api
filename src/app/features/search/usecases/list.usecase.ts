import { Result, ResultDTO } from "../../../shared/utils";
import { SearchRepository } from "../repository";

export class ListUsecase {
  async execute(): Promise<ResultDTO> {
    const searchRepository = new SearchRepository();

    const list = await searchRepository.list();

    return Result.success(200, "sucesso.", list);
  }
}
