export abstract class Base {
  constructor(protected _id: string, protected _createdAt: Date) {}

  toJSON() {}
}
