import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CycleEvent as CycleEventModel, CycleEventDocument } from './cycleevent/cycleevent.schema';
import { ICycleEvent, IUser } from '@cycle-gram-web-main/shared/api';
import { Logger } from '@nestjs/common';
import { CreateCycleEventDto, UpdateCycleEventDto } from '@cycle-gram-web-main/backend/dto';

@Injectable()
export class CycleEventService {
  private readonly logger: Logger = new Logger(CycleEventService.name);

  constructor(
    @InjectModel(CycleEventModel.name) private cycleeventModel: Model<CycleEventDocument>
  ) {}
  TAG = 'CycleEventService';

  async getAll(): Promise<ICycleEvent[]> {
    Logger.log('getAll', this.TAG);
    return await this.cycleeventModel.find().exec();
  }

  async getOne(id: string): Promise<ICycleEvent | null> {
    Logger.log(`getOne(${id})`, this.TAG);
    const cycleevent = await this.cycleeventModel.findOne({ id }).exec();
    if (!cycleevent) {
      throw new NotFoundException(`CycleEvent could not be found!`);
    }
    return cycleevent;
  }

  async create(cycleevent: CreateCycleEventDto): Promise<ICycleEvent> {
    Logger.log('create', this.TAG);
    const lastCycleEvent = await this.cycleeventModel.findOne().sort({ _id: -1 }).limit(1);

    const newNumericId = lastCycleEvent ? parseInt(lastCycleEvent.id, 10) + 1 : 1;

    cycleevent.id = newNumericId.toString();

    const createdItem = await this.cycleeventModel.create(cycleevent);
    return createdItem;
  }

  async update(id: string, cycleevent: UpdateCycleEventDto): Promise<ICycleEvent | null> {
    const updated = await this.cycleeventModel.findOneAndUpdate({ id }, cycleevent);
    return updated;
  }

  async addParticipant(id: string, user: IUser): Promise<ICycleEvent | null> {
    const cycleevent = await this.cycleeventModel.findOne({ id }).exec();
    if (!cycleevent) {
      throw new NotFoundException(`CycleEvent could not be found!`);
    }

    cycleevent.participants.push(user);

    const updated = await this.cycleeventModel.findOneAndUpdate({ id }, cycleevent);
    return updated;
  }

  async deleteCycleEvent(id: string): Promise<void> {
    this.cycleeventModel.findOneAndDelete({ id }).exec();
  }
}
