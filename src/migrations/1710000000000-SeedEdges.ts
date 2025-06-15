import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { v4 } from 'uuid';

const uuid4 = v4();
export class CreateAndSeedEdges1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the 'edges' table
    await queryRunner.createTable(
      new Table({
        name: 'edges',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `'${uuid4}'`,
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
          },
          {
            name: 'capacity',
            type: 'varchar',
          },
          {
            name: 'node1_alias',
            type: 'varchar',
          },
          {
            name: 'node2_alias',
            type: 'varchar',
          },
        ],
      }),
    );

    // Seed 10 rows into the 'edges' table
    for (let i = 0; i < 10; i++) {
      const node1 = `Node1-${i}`;
      const node2 = `Node2-${i}`;
      const id = v4();
      const capacity = Math.floor(
        Math.random() * (1_000_000 - 10_000 + 1) + 10_000,
      ).toString();
      await queryRunner.query(
        `INSERT INTO edges (id, created_at, updated_at, capacity, node1_alias, node2_alias)
         VALUES ($1, NOW(), NOW(), $2, $3, $4)`,
        [id, capacity, node1, node2],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('edges');
  }
}
