import { Module } from '@nestjs/common';
import { ObservationController } from './observations/controller';
import { ObservationService } from './observations/service';
import { ClientController } from './clients/controller';
import { PrismaService } from 'src/prisma.service';
import { ClientService } from './clients/service';

@Module({
  imports: [],
  controllers: [ObservationController, ClientController],
  providers: [ObservationService, ClientService, PrismaService],
})
export class ClientObservationModule {}
