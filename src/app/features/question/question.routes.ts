import { Router } from "express";
import { QuestionController } from "./controller";

export default () => {
  const router = Router();

  router.post("/question", QuestionController.questionCreate);

  router.get("/question/district", QuestionController.listAllQuestion);

  router.get("/question", QuestionController.listQuestion);

  router.get("/question/:idQuestion", QuestionController.listQuestionsById);

  router.get("/getIdQuestion", QuestionController.getIdQuestion);

  router.put("/question/edit/:id", QuestionController.editQuestion);

  router.delete("/question/delete/:id", QuestionController.deleteQuestion);

  return router;
};
