import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CycleRoute as CycleRouteModel, CycleRouteDocument } from './cycleroute/cycleroute.schema';
import { ICycleRoute } from '@cycle-gram-web-main/shared/api';
import { Logger } from '@nestjs/common';
import { CreateCycleRouteDto, UpdateCycleRouteDto } from '@cycle-gram-web-main/backend/dto';
import { UserService } from './user.service'; // import UserService
import { NeoService } from './neo.service';

@Injectable()
export class CycleRouteService {
  private readonly logger: Logger = new Logger(CycleRouteService.name);

  constructor(
    @InjectModel(CycleRouteModel.name) private cyclerouteModel: Model<ICycleRoute>,
    private userService: UserService, // inject UserService
    private neoService: NeoService // inject NeoService
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
    await this.neoService.addOrUpdateCycleRoute(createdItem); // add cycle route to neo4j
    return createdItem;
  }

  async update(id: string, cycleroute: UpdateCycleRouteDto): Promise<ICycleRoute | null> {
    const updated = await this.cyclerouteModel.findOneAndUpdate({ id }, cycleroute, { new: true });
    if (updated) {
      await this.neoService.addOrUpdateCycleRoute(updated); // update cycle route in neo4j
    }
    return updated;
  }

  async deleteCycleRoute(id: string): Promise<void> {
    // Delete the cycle route from the cycle route collection
    const result = await this.cyclerouteModel.findOneAndDelete({ id });
    Logger.log(`result = ${result}`, this.TAG);
    const delCycleRoute = result as unknown as ICycleRoute; // Cast result to ICycleRoute
    await this.userService.deleteCycleroute(id);
    if (delCycleRoute) {
      await this.neoService.deleteCycleRoute(delCycleRoute);
    }
  }

}
