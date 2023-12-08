import { Test, TestingModule } from '@nestjs/testing';
import { CycleEventController } from './cycleevent.controller';

describe('CycleEventController', () => {
  let controller: CycleEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CycleEventController],
    }).compile();

    controller = module.get<CycleEventController>(CycleEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
