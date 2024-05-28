import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ClientDto, CreateClientDto } from '../dto/client.dto';

@Injectable()
export class ClientService {
  constructor(
    private prisma: PrismaService
  ) {}

  async findOne(id: string): Promise<ClientDto | null> {
    return this.prisma.client.findUnique({
      where: { id }
    });
  }
  
  async getAll(): Promise<ClientDto[]> {
    // TODO: add pagination
    return this.prisma.client.findMany();
  }

  async insert(clientDto: CreateClientDto): Promise<ClientDto> {
    // TODO: remove createAt and updatedAt from the client object
    return this.prisma.client.create({
      data: clientDto,
    });
  }
}
