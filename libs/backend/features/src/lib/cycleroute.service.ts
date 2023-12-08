import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CycleRoute as CycleRouteModel, CycleRouteDocument } from './cycleroute/cycleroute.schema';
import { ICycleRoute } from '@cycle-gram-web-main/shared/api';
import { Logger } from '@nestjs/common';
import { CreateCycleRouteDto, UpdateCycleRouteDto } from '@cycle-gram-web-main/backend/dto';

@Injectable()
export class CycleRouteService {
  private readonly logger: Logger = new Logger(CycleRouteService.name);

  constructor(
    @InjectModel(CycleRouteModel.name) private cyclerouteModel: Model<CycleRouteDocument>
  ) {}
  TAG = 'CycleRouteService';

  async getAll(): Promise<ICycleRoute[]> {
    Logger.log('getAll', this.TAG);
    return await this.cyclerouteModel.find().exec();
  }

  async getOne(id: string): Promise<ICycleRoute | null> {
    Logger.log(`getOne(${id})`, this.TAG);
    const cycleroute = await this.cyclerouteModel.findOne({ id }).exec();
    if (!cycleroute) {
      throw new NotFoundException(`CycleRoute could not be found!`);
    }
    return cycleroute;
  }

  async create(cycleroute: CreateCycleRouteDto): Promise<ICycleRoute> {
    Logger.log('create', this.TAG);
    const lastCycleRoute = await this.cyclerouteModel.findOne().sort({ _id: -1 }).limit(1);

    const newNumericId = lastCycleRoute ? parseInt(lastCycleRoute.id, 10) + 1 : 1;

    cycleroute.id = newNumericId.toString();

    const createdItem = await this.cyclerouteModel.create(cycleroute);
    return createdItem;
  }

  async update(id: string, cycleroute: UpdateCycleRouteDto): Promise<ICycleRoute | null> {
    const updated = await this.cyclerouteModel.findOneAndUpdate({ id }, cycleroute);
    return updated;
  }

  async deleteCycleRoute(id: string): Promise<void> {
    this.cyclerouteModel.findOneAndDelete({ id }).exec();
  }
}
