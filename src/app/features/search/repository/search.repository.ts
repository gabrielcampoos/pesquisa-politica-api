import { FindOptionsWhere } from "typeorm";
import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Search } from "../../../models";
import { QuestionEntity, SearchEntity } from "../../../shared/entities";
import { SearchCreateDTO, SearchFilterDTO } from "../dtos";
import { Question, QuestionJSON } from "../../../models/Question";

export class SearchRepository {
  private _manager = DatabaseConnection.connection.manager;

  async searchCreate(data: SearchCreateDTO): Promise<Search> {
    const { district, researcherName, researchedName } = data;

    const searchCreate = this._manager.create(SearchEntity, {
      district,
      researcherName,
      researchedName,
    });

    const searchCreated = await this._manager.save(searchCreate);

    return this.entityToModel(searchCreated);
  }

  async findSearchById(idSearch?: string): Promise<Search | undefined> {
    const searchFound = await this._manager.findOne(SearchEntity, {
      where: {
        id: idSearch,
      },
    });

    if (!searchFound) return undefined;

    return this.entityToModel(searchFound);
  }

  async findQuestions(idSearch?: string): Promise<Question[]> {
    const clausule: FindOptionsWhere<QuestionEntity> = {
      idSearch: idSearch,
    };

    const find = await this._manager.find(QuestionEntity, {
      where: clausule,
    });

    return find.map((questions) => this.entityToModelQuestions(questions));
  }

  async searchListByDistrict(
    district: string,
    idSearch: string
  ): Promise<Search[] | null> {
    const clausule: FindOptionsWhere<SearchEntity> = {
      district,
    };

    const clausuleIdQuestion: FindOptionsWhere<QuestionEntity> = {
      idSearch,
    };

    if (district) {
      clausule.district = district;
    }

    if (idSearch) {
      clausuleIdQuestion.idSearch = idSearch;
    }

    const searchFound = await this._manager.find(SearchEntity, {
      where: clausule,
    });

    if (!searchFound) return null;

    const questionsFound = await this._manager.find(QuestionEntity, {
      where: clausuleIdQuestion,
    });

    if (!questionsFound) return null;

    return searchFound.map((searches) => this.entityToModel(searches));
  }

  async list(): Promise<Search[]> {
    const list = await this._manager.find(SearchEntity);

    return list.map((searches) => this.entityToModel(searches));
  }

  private entityToModelQuestions(dataDB: QuestionEntity): Question {
    const search = new Search(
      dataDB.search.id,
      dataDB.search.district,
      dataDB.search.researcherName,
      dataDB.search.researchedName,
      dataDB.search.createdAt
    );

    const question = new Question(
      dataDB.id,
      dataDB.question,
      dataDB.answer,
      dataDB.createdAt,
      search
    );

    return question;
  }

  private entityToModel(dataDB: SearchEntity): Search {
    const search = new Search(
      dataDB.id,
      dataDB.district,
      dataDB.researcherName,
      dataDB.researchedName,
      dataDB.createdAt
    );

    return search;
  }
}
