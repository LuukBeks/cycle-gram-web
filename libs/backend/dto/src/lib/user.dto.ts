import {
  IsNotEmpty,
  IsString,
  // IsBoolean,
  IsOptional,
  // IsDate,
} from 'class-validator';
import {
  ICreateUser,
  IUpdateUser,
  IUpsertUser,
  // UserSort,
} from '@cycle-gram-web-main/shared/api';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class UpsertUserDto implements IUpsertUser {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}

export class UpdateUserDto implements IUpdateUser {
  @IsString()
  @IsOptional()
  title!: string;
}
