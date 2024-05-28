import { Test, TestingModule } from '@nestjs/testing';
import { ObservationController } from './controller';
import { ObservationService } from './service';

describe('ObservationController', () => {
  let controller: ObservationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ObservationController],
      providers: [ObservationService],
    }).compile();

    controller = app.get<ObservationController>(ObservationController);
  });

  describe('root', () => {
    it.skip('should return "Hello World!"', () => {
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
