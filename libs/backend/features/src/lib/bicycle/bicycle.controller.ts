import { Controller, Put, Delete } from '@nestjs/common';
import { BicycleService } from '../bicycle.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IBicycle } from '@cycle-gram-web-main/shared/api';
import { CreateBicycleDto } from '@cycle-gram-web-main/backend/dto';

@Controller('bicycle')
export class BicycleController {
    constructor(private bicycleService: BicycleService) {}

    @Get('')
    getAll(): Promise<IBicycle[]> {
        return this.bicycleService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IBicycle | null> {
        return this.bicycleService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateBicycleDto): Promise<IBicycle> {
        return this.bicycleService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: IBicycle): Promise<IBicycle | null> {
        return this.bicycleService.update(id, data);
    }

    @Delete(':id')
    deleteBicycle(@Param('id') id: string): Promise<void> {
        return this.bicycleService.deleteBicycle(id);
    }
}