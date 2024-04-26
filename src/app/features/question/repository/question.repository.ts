import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { EditQuestionDTO, QuestionCreateDTO } from "../dtos";
import { Question, QuestionJSON } from "../../../models/Question";
import { QuestionEntity } from "../../../shared/entities/question.entity";
import { Search } from "../../../models";

export interface FilterDTO {
  idQuestion?: string;
}

export class QuestionRepository {
  private _manager = DatabaseConnection.connection.manager;

  async questionCreate(data: QuestionCreateDTO): Promise<Question> {
    const { idSearch, question, answer } = data;

    const questionCreate = this._manager.create(QuestionEntity, {
      idSearch,
      question,
      answer,
    });

    const questionCreated = await this._manager.save(questionCreate);

    return (await this.findQuestionById(
      idSearch,
      questionCreated.id
    )) as Question;
  }

  async findQuestionById(
    idQuestion: string,
    idSearch?: string
  ): Promise<Question | undefined> {
    const questionFound = await this._manager.findOne(QuestionEntity, {
      where: {
        id: idQuestion,
        idSearch,
      },
      relations: {
        search: true,
      },
    });

    if (!questionFound) return undefined;

    return this.entityToModel(questionFound);
  }

  async listQuestionsByDistrict(district: string): Promise<Question[]> {
    const filteredList = await this._manager.find(QuestionEntity, {
      relations: {
        search: true,
      },
    });

    const filter = filteredList.map((list) => this.entityToModel(list));

    const filteredByDistrict = filter.filter((question) => {
      return question.toJSON().idSearch.district.trim() === district.trim();
    });

    return filteredByDistrict;
  }

  async editQuestion(data: EditQuestionDTO): Promise<void> {
    const { id, question, answer } = data;

    await this._manager.update(
      QuestionEntity,
      {
        id: id,
      },
      {
        question,
        answer,
      }
    );
  }

  async deleteQuestion(id: string): Promise<void> {
    await this._manager.delete(QuestionEntity, { id });
  }

  async listQuestion(): Promise<Question[]> {
    const listQuestion = await this._manager.find(QuestionEntity, {
      relations: {
        search: true,
      },
    });

    return listQuestion.map((questions) => this.entityToModel(questions));
  }

  private entityToModel(dataDB: QuestionEntity): Question {
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
}
