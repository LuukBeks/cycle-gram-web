import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user/user.schema';
import { IUser } from '@cycle-gram-web-main/shared/api';
import { Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@cycle-gram-web-main/backend/dto';
import { randomBytes } from 'crypto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}
  TAG = 'UserService';

  async getAll(): Promise<IUser[]> {
    Logger.log('getAll', this.TAG);
    return await this.userModel.find().exec();
  }

  async getOne(id: string): Promise<IUser | null> {
    Logger.log(`getOne(${id})`, this.TAG);
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new NotFoundException(`User could not be found!`);
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<IUser> {
    Logger.log('create', this.TAG);
    const lastUser = await this.userModel.findOne().sort({ _id: -1 }).limit(1);

    const newNumericId = lastUser ? parseInt(lastUser.id, 10) + 1 : 1;

    user.id = newNumericId.toString();

    const createdItem = await this.userModel.create(user);
    return createdItem;
  }

  async update(id: string, user: UpdateUserDto): Promise<IUser | null> {
    const updated = await this.userModel.findOneAndUpdate({ id }, user);
    return updated;
  }

  async deleteUser(id: string): Promise<void> {
    this.userModel.findOneAndDelete({ id }).exec();
  }

  async login(email: string, password: string): Promise<IUser | null> {
    const foundUser = await this.userModel.findOne({ email }).exec();

    if (!foundUser) {
      throw new NotFoundException(`User with email ${email} not found!`);
    }

    if (foundUser.password !== password) {
      throw new NotFoundException(
        `Incorrect password for user with email ${email}!`
      );
    }

    // Generate a JWT token
    const secretKey = randomBytes(32).toString('hex');
    const userId = foundUser.id.toString();
    const token = sign({ sub: userId }, secretKey, {
      expiresIn: '1h',
    });

    // Add the token to the response
    const response = { ...foundUser.toJSON(), token };
    return response;
  }

  async deleteBicycle(bicycleId: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ 'bicycles.id': bicycleId });
    if (!user || !user.bicycles) {
      return null;
    }
  
    user.bicycles = user.bicycles.filter(bicycle => bicycle.id !== bicycleId);
    await user.save();
  
    return user;
  }

  async deleteCycleroute(cyclerouteId: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ 'cycleRoutes.id': cyclerouteId });
    if (!user || !user.cycleRoutes) {
      return null;
    }
  
    user.cycleRoutes = user.cycleRoutes.filter(cycleroute => cycleroute.id !== cyclerouteId);
    await user.save();
  
    return user;
  }
}
