import { InputType, Field, Int } from '@nestjs/graphql';
import { Min, Max, Length } from 'class-validator';

@InputType()
export class CreateEdgeInput {
  @Field(() => Int)
  @Min(10000)
  @Max(1000000)
  capacity: number;

  @Field()
  @Length(1, 255)
  node1_alias: string;

  @Field()
  @Length(1, 255)
  node2_alias: string;
}
