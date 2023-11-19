import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ICreateUser, IUpdateUser, IUpsertUser } from '@cycle-gram-web-main/shared/api';
import { UserSort } from 'libs/cycle-gram/features/src/lib/user/user.model';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  dob!: Date;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsString()
  @IsNotEmpty()
  sort!: UserSort;
}

export class UpsertUserDto implements IUpsertUser {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  dob!: Date;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsString()
  @IsNotEmpty()
  sort!: UserSort;
}

export class UpdateUserDto implements IUpdateUser {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  dob?: Date;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  sort?: UserSort;
}
