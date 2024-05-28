import { Injectable } from '@nestjs/common';
import {
  Client,
  Ethnicity,
  Gender,
  Observation
} from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ClientService } from '../clients/service';
import {
  CreateManyObservationDto,
  ObservationDto
} from '../dto/observation.dto';

const observationToObservationDtoMapping = (observation: Observation, client: Client): ObservationDto => {
  return {
    client,
    dateTesting: observation.dateTesting,
    creatine: {
      value: observation.creatine,
      unit: observation.creatineUnit,
    },
    chloride: {
      value: observation.chloride,
      unit: observation.chlorideUnit,
    },
    fastingGlucose: {
      value: observation.fastingGlucose,
      unit: observation.fastingGlucoseUnit,
    },
    potassium: {
      value: observation.potassium,
      unit: observation.potassiumUnit
    },
    sodium: {
      value: observation.sodium,
      unit: observation.sodiumUnit,
    },
    totalCalcium: {
      value: observation.totalCalcium,
      unit: observation.totalCalciumUnit,
    },
    totalProtein: {
      value: observation.totalProtein,
      unit: observation.totalProteinUnit,
    },
  };
};

@Injectable()
export class ObservationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clientService: ClientService
  ) {}

  async getAll(): Promise<ObservationDto[]> {
    // TODO: add pagination
    // TODO: add filtering
    const observations = await this.prisma.observation.findMany({
      include: {
        client: true
      },
      orderBy: {
        dateTesting: 'asc' // TODO: make it a parameter
      }
    });

    return observations.map(
      observation => observationToObservationDtoMapping(observation, observation.client)
    );
  }

  async insertMany(data: CreateManyObservationDto): Promise<ObservationDto[]> {
    // Check if the client exists already otherwise insert it.
    const clientData = data.client;
    let client = await this.clientService.findOne(clientData.id);
    if (!client) {
      // Create new client
      client = await this.clientService.insert({
        id: clientData.id,
        gender: clientData.gender,
        ethnicity: clientData.ethnicity,
        birthdayDate: new Date(clientData.birthdayDate),
      });
    }

    const result = await this.prisma.$transaction(data.observations.map(observation => {
      return this.prisma.observation.create({
        data: {
          clientId: client.id,
          dateTesting: new Date(observation.dateTesting),
          creatine: observation.creatine.value,
          creatineUnit: observation.creatine.unit,
          chloride: observation.chloride.value,
          chlorideUnit: observation.chloride.unit,
          fastingGlucose: observation.fastingGlucose.value,
          fastingGlucoseUnit: observation.fastingGlucose.unit,
          potassium: observation.potassium.value,
          potassiumUnit: observation.potassium.unit,
          sodium: observation.sodium.value,
          sodiumUnit: observation.sodium.unit,
          totalCalcium: observation.totalCalcium.value,
          totalCalciumUnit: observation.totalCalcium.unit,
          totalProtein: observation.totalProtein.value,
          totalProteinUnit: observation.totalProtein.unit,
        }
      });
    }));

    return result.map(
      observation => observationToObservationDtoMapping(observation, client as Client)
    );;
  }


}
