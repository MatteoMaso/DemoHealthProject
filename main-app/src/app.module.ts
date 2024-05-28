import { Module } from '@nestjs/common';
import { ClientObservationModule } from './clientObservation/module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './module-health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientObservationModule,
    HealthModule,
  ],
})
export class AppModule {}
