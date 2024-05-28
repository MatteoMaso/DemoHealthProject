import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ObservationService } from './service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateManyObservationDto, ObservationDto } from '../dto/observation.dto';

@ApiTags('Observation')
@Controller('observation')
export class ObservationController {
  constructor(
    private readonly service: ObservationService
  ) {}

  @ApiOperation({ summary: 'Get all observations' })
  @ApiOkResponse({ type: ObservationDto, isArray: true })
  @Get()
  async get(): Promise<ObservationDto[]> {
    // TODO: add pagination
    // TODO: add filtering
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Insert a list of observations' })
  @ApiCreatedResponse({ type: ObservationDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  async insertMany(@Body() observations: CreateManyObservationDto) {
    return this.service.insertMany(observations);
  }
}
