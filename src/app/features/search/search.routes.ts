import { Router } from "express";
import { SearchController } from "./controller";

export default () => {
  const router = Router();

  router.post("/search", SearchController.searchCreate);

  router.get("/search", SearchController.list);

  router.get("/search/district", SearchController.listAllSearches);

  router.get("/search/:idSearch", SearchController.listSearch);

  return router;
};
