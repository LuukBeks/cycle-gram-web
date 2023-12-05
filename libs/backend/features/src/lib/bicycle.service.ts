import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Bicycle as BicycleModel, BicycleDocument } from './bicycle/bicycle.shema';
import { IBicycle } from '@cycle-gram-web-main/shared/api';
import { Logger } from '@nestjs/common';
import { CreateBicycleDto, UpdateBicycleDto } from '@cycle-gram-web-main/backend/dto';

@Injectable()
export class BicycleService {
  private readonly logger: Logger = new Logger(BicycleService.name);

  constructor(
    @InjectModel(BicycleModel.name) private bicycleModel: Model<BicycleDocument>
  ) {}
  TAG = 'BicycleService';

  async getAll(): Promise<IBicycle[]> {
    Logger.log('getAll', this.TAG);
    return await this.bicycleModel.find().exec();
  }

  async getOne(id: string): Promise<IBicycle | null> {
    Logger.log(`getOne(${id})`, this.TAG);
    const bicycle = await this.bicycleModel.findOne({ id }).exec();
    if (!bicycle) {
      throw new NotFoundException(`Bicycle could not be found!`);
    }
    return bicycle;
  }

  async create(bicycle: CreateBicycleDto): Promise<IBicycle> {
    Logger.log('create', this.TAG);
    const lastBicycle = await this.bicycleModel.findOne().sort({ _id: -1 }).limit(1);

    const newNumericId = lastBicycle ? parseInt(lastBicycle.id, 10) + 1 : 1;

    bicycle.id = newNumericId.toString();

    const createdItem = await this.bicycleModel.create(bicycle);
    return createdItem;
  }

  async update(id: string, bicycle: UpdateBicycleDto): Promise<IBicycle | null> {
    const updated = await this.bicycleModel.findOneAndUpdate({ id }, bicycle);
    return updated;
  }

  async deleteBicycle(id: string): Promise<void> {
    this.bicycleModel.findOneAndDelete({ id }).exec();
  }
}
