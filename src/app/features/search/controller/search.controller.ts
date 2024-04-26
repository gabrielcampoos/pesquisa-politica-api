import { Request, Response } from "express";
import {
  ListAllSearchesUsecase,
  ListSearchesUsecase,
  SearchCreateUsecase,
} from "../usecases";
import { Result, httpHelper } from "../../../shared/utils";
import { ListUsecase } from "../usecases/list.usecase";

export class SearchController {
  static async searchCreate(request: Request, response: Response) {
    const { district, researcherName, researchedName } = request.body;

    try {
      const usecase = new SearchCreateUsecase();

      const result = await usecase.execute({
        district,
        researcherName,
        researchedName,
      });

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async listSearch(request: Request, response: Response) {
    const { idSearch } = request.body;

    try {
      const usecase = new ListSearchesUsecase();

      const result = await usecase.execute(idSearch);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async listAllSearches(request: Request, response: Response) {
    const { district, idSearch } = request.body;

    try {
      const usecase = new ListAllSearchesUsecase();

      const result = await usecase.execute({ district, idSearch });

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async list(request: Request, response: Response) {
    try {
      const usecase = new ListUsecase();

      const result = await usecase.execute();

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }
}
