import {
  Controller,
  Get,
  NotFoundException,
  Param
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ClientService } from './service';
import { ClientDto } from '../dto/client.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @ApiOperation({ summary: 'Get all clients' })
  @ApiOkResponse({ type: ClientDto, isArray: true })
  @Get()
  async list(): Promise<ClientDto[]> {
    // TODO: add pagination
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Get a client by id' })
  @ApiOkResponse({ type: ClientDto })
  @ApiNotFoundResponse({ description: 'Client not found'})
  @Get(':id')
  async get(@Param('id') id: string): Promise<ClientDto> {
    //TODO: add param validation
    const client = await this.service.findOne(id);
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    
    return client;
  }
}
