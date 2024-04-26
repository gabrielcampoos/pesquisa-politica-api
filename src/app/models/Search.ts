import { Base } from "./Base";

export interface SearchJSON {
  id: string;
  district: string;
  researcherName: string;
  researchedName: string;
  createdAt: Date;
}

export class Search extends Base {
  constructor(
    _id: string,
    private _district: string,
    private _researcherName: string,
    private _researchedName: string,
    _createdAt: Date
  ) {
    super(_id, _createdAt);
  }

  toJSON(): SearchJSON {
    return {
      id: this._id,
      district: this._district,
      researcherName: this._researcherName,
      researchedName: this._researchedName,
      createdAt: this._createdAt,
    };
  }
}
