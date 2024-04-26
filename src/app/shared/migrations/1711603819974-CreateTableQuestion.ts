import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableQuestion1711603819974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "question",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "id_search",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "question",
            type: "varchar",
            length: "255",
          },
          {
            name: "answer",
            type: "varchar",
            length: "15",
          },
          {
            name: "created_at",
            type: "timestamp",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["id_search"],
            referencedTableName: "search",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("question", true, true, true);
  }
}
