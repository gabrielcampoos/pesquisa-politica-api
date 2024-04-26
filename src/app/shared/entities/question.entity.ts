import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { randomUUID } from "crypto";
import { AnswerEnum } from "../enums";
import { SearchEntity } from "./search.entity";
import { Search } from "../../models";

@Entity({ name: "question" })
export class QuestionEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ name: "id_search", type: "uuid", nullable: false })
  idSearch!: string;

  @Column()
  question!: string;

  @Column({ type: "enum", enum: AnswerEnum })
  answer!: AnswerEnum;

  @Column({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(() => SearchEntity, (search) => search.question)
  @JoinColumn({
    name: "id_search",
    foreignKeyConstraintName: "search_id_fk",
    referencedColumnName: "id",
  })
  search!: SearchEntity;

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
    this.createdAt = new Date();
  }
}
