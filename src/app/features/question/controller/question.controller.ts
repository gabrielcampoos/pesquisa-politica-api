import { Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";
import {
  DeleteQuestionUsecase,
  EditQuestionUsecase,
  GetIdQuestionUsecase,
  ListQuestionByIdUsecase,
  ListQuestionUsecase,
  QuestionCreateUsecase,
} from "../usecases";
import { ListAllQuestionUsecase } from "../usecases/list-all-question.usecase";

export class QuestionController {
  static async questionCreate(request: Request, response: Response) {
    const { idSearch, question, answer } = request.body;

    try {
      const usecase = new QuestionCreateUsecase();

      const result = await usecase.execute({
        idSearch,
        question,
        answer,
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

  static async listQuestionsById(request: Request, response: Response) {
    try {
      const { idQuestion } = request.params;

      const { idSearch } = request.body;

      const usecase = new ListQuestionByIdUsecase();

      const result = await usecase.execute({ idSearch, idQuestion });

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async listAllQuestion(request: Request, response: Response) {
    try {
      const { district } = request.body;

      const usecase = new ListAllQuestionUsecase();

      const result = await usecase.execute({ district });

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async editQuestion(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { question, answer, createdAt } = request.body;

      const usecase = new EditQuestionUsecase();

      const result = await usecase.execute({
        id,
        newData: {
          question,
          answer,
          createdAt,
        },
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

  static async deleteQuestion(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const usecase = new DeleteQuestionUsecase();

      const result = await usecase.execute({ id });

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async listQuestion(request: Request, response: Response) {
    try {
      const usecase = new ListQuestionUsecase();

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

  static async getIdQuestion(request: Request, response: Response) {
    try {
      const { id } = request.body;

      const usecase = new GetIdQuestionUsecase();

      const result = await usecase.execute(id);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }
}
