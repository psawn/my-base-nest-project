import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserTable1653962851514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'google_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'facebook_id',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
