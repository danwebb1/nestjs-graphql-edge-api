import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Edge } from './edge.entity';
import { EdgeService } from './edge.service';
import { CreateEdgeInput } from './dto/create.input';
import { ParseUUIDPipe } from '@nestjs/common';
import {UpdateEdgeInput} from "./dto/update.input";

@Resolver(() => Edge)
export class EdgeResolver {
  constructor(private readonly edgeService: EdgeService) {}

  @Query(() => [Edge], { name: 'edges' })
  findAll() {
    return this.edgeService.findAll();
  }

  @Query(() => Edge, { name: 'edge', nullable: true })
  findOne(@Args('id', { type: () => ID }, new ParseUUIDPipe()) id: string) {
    return this.edgeService.findOne(id);
  }

  @Mutation(() => Edge)
  createEdge(@Args('input') input: CreateEdgeInput) {
    return this.edgeService.create(input);
  }

  @Mutation(() => Edge)
  updateEdge(
    @Args('id', { type: () => ID }, new ParseUUIDPipe()) id: string,
    @Args('input') input: UpdateEdgeInput,
  ) {
    return this.edgeService.update(id, input);
  }
}
