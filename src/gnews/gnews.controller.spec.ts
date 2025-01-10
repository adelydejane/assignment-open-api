import { Test, TestingModule } from '@nestjs/testing';
import { GnewsController } from './gnews.controller';

describe('GnewsController', () => {
  let controller: GnewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GnewsController],
    }).compile();

    controller = module.get<GnewsController>(GnewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
