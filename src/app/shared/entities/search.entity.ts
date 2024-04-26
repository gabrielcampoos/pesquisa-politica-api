import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { randomUUID } from "crypto";
import { QuestionEntity } from "./question.entity";

@Entity({ name: "search" })
export class SearchEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  district!: string;

  @Column({ name: "researcher_name" })
  researcherName!: string;

  @Column({ name: "researched_name" })
  researchedName!: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @OneToMany(() => QuestionEntity, (entity) => entity.search)
  question!: QuestionEntity[];

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
    this.createdAt = new Date();
  }
}
