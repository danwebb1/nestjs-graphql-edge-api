import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { Min, Max, Length, IsOptional } from 'class-validator';

@InputType()
export class UpdateEdgeInput {
  @Field(() => Int, { nullable: true })
  @Min(10000)
  @Max(1000000)
  @IsOptional()
  capacity?: number;

  @Field({ nullable: true })
  @Length(1, 255)
  @IsOptional()
  node1_alias: string;

  @Field({ nullable: true })
  @Length(1, 255)
  @IsOptional()
  node2_alias: string;
}