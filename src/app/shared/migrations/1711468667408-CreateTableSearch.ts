import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableSearch1711468667408 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "search",
        columns: [
          {
            name: "id",
            type: "uuid",
            isNullable: false,
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "district",
            type: "varchar",
            length: "100",
          },
          {
            name: "researcher_name",
            type: "varchar",
            length: "100",
          },
          {
            name: "researched_name",
            type: "varchar",
            length: "100",
          },
          {
            name: "created_at",
            type: "timestamp",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("search", true, true, true);
  }
}
