import { Test, TestingModule } from '@nestjs/testing';
import { CycleRouteController } from './cycleroute.controller';

describe('CycleRouteController', () => {
  let controller: CycleRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CycleRouteController],
    }).compile();

    controller = module.get<CycleRouteController>(CycleRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
