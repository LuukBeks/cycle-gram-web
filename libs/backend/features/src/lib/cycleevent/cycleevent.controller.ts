import { Controller, Put, Delete } from '@nestjs/common';
import { CycleEventService } from '../cycleevent.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { ICycleEvent } from '@cycle-gram-web-main/shared/api';
import { CreateCycleEventDto, UpdateCycleEventDto } from '@cycle-gram-web-main/backend/dto';
import { UserService } from '../user.service';

@Controller('cycleevent')
export class CycleEventController {
    constructor(private cycleeventService: CycleEventService, private userService: UserService) {}

    @Get('')
    getAll(): Promise<ICycleEvent[]> {
        return this.cycleeventService.getAll();
    }

    @Post('')
    create(@Body() data: CreateCycleEventDto): Promise<ICycleEvent> {
        return this.cycleeventService.create(data);
    }
    
    @Put(':id/addParticipant/:userId')
    async addParticipant(@Param('id') id: string, @Param('userId') userId: string): Promise<ICycleEvent | null> {
        const user = await this.userService.getOne(userId);
    
        if (user) {
            return this.cycleeventService.addParticipant(id, user);
        } else {
            console.error(`User with id ${userId} not found!`);
            return null;
        }
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<ICycleEvent | null> {
        return this.cycleeventService.getOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: UpdateCycleEventDto): Promise<ICycleEvent | null> {
        return this.cycleeventService.update(id, data);
    }

    @Delete(':id')
    deleteCycleEvent(@Param('id') id: string): Promise<void> {
        return this.cycleeventService.deleteCycleEvent(id);
    }
}