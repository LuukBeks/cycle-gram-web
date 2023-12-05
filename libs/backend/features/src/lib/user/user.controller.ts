import { Controller, Put, Delete } from '@nestjs/common';
import { UserService } from '../user.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IUser } from '@cycle-gram-web-main/shared/api';
import { CreateUserDto } from '@cycle-gram-web-main/backend/dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('')
    getAll(): Promise<IUser[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IUser | null> {
        return this.userService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateUserDto): Promise<IUser> {
        return this.userService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: IUser): Promise<IUser | null> {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }
}