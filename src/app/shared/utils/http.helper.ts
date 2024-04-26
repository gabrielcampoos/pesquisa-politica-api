import { Response } from "express";
import { ResultDTO } from "./result.helper";

class HttpHelper {
  public success(res: Response, result: ResultDTO) {
    return res.status(result.code ?? 200).send(result);
  }

  public serverError(res: Response, result: ResultDTO) {
    return res.status(result.code ?? 500).send(result);
  }

  public badRequestError(res: Response, result: ResultDTO) {
    return res.status(result.code ?? 400).send(result);
  }
}

export const httpHelper = new HttpHelper();
