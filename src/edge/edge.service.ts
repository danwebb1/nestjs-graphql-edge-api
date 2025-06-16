import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Edge } from './edge.entity';
import { CreateEdgeInput } from './dto/create.input';
import { ClientProxy } from '@nestjs/microservices';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UpdateEdgeInput } from './dto/update.input';

@Injectable()
export class EdgeService {
  constructor(
    @InjectRepository(Edge)
    private readonly edgeRepo: Repository<Edge>,
    @Inject('EDGE_SERVICE') private readonly client: ClientProxy,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(input: CreateEdgeInput): Promise<Edge> {
    try {
      console.log(input);
      const edge = this.edgeRepo.create(input);
      const saved = await this.edgeRepo.save(edge);
      try {
        this.client.emit('edge.created', saved);
      } catch (error) {
        console.log(error);
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

  async update(id: string, input: UpdateEdgeInput): Promise<Edge> {
    try {
      const edge = await this.findOne(id);
      Object.assign(edge, input);
      try {
        const updated = await this.edgeRepo.save(edge);
        this.client.emit('edge.updated', updated);
        return updated;
      } catch (error) {
        console.log(error);
        this.logger.error('Failed to emit edge.created', error);
      }
    } catch (error) {
      throw new BadRequestException('Invalid data for updating Edge');
    }
  }
}
