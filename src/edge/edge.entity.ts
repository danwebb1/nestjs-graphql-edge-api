import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
} from 'typeorm';
import {
  ObjectType,
  Field,
  ID,
  Int,
  GraphQLISODateTime,
} from '@nestjs/graphql';

@Entity({ name: 'edges' })
@ObjectType()
@Check(`"capacity" BETWEEN 10000 AND 1000000`)
export class Edge {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updated_at: Date;

  @Column({ type: 'int' })
  @Field(() => Int)
  capacity: number;

  @Column({ name: 'node1_alias', type: 'varchar', length: 255 })
  @Field()
  node1_alias: string;

  @Column({ name: 'node2_alias', type: 'varchar', length: 255 })
  @Field()
  node2_alias: string;
}
