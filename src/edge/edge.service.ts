import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Edge } from './edge.entity';
import { CreateEdgeInput } from './dto/create.input';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class EdgeService {
  constructor(
    @InjectRepository(Edge) private readonly edgeRepo: Repository<Edge>,
    @Inject('EDGE_SERVICE') private readonly client: ClientProxy,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(input: CreateEdgeInput): Promise<Edge> {
    const edge = this.edgeRepo.create(input);
    try {
      const saved = await this.edgeRepo.save(edge);
      try {
        await lastValueFrom(this.client.emit('edge.created', saved));
      } catch (error) {
        this.logger.error('Failed to emit edge.created', error);
      }
      return saved;
    } catch (error) {
      throw new BadRequestException('Error creating Edge');
    }
  }

  async findAll(): Promise<Edge[]> {
    return this.edgeRepo.find();
  }

  async findOne(id: string): Promise<Edge> {
    const edge = await this.edgeRepo.findOneBy({ id });
    if (!edge) {
      throw new NotFoundException(`No Edge found for ID`, id);
    }
    return edge;
  }
}
