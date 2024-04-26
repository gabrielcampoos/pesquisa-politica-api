import { Express } from "express";
import searchRoutes from "../../app/features/search/search.routes";
import questionRoutes from "../../app/features/question/question.routes";

export const makeRoutes = (app: Express) => {
  app.use(searchRoutes(), questionRoutes());
};
