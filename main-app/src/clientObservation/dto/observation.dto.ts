import { ApiProperty, OmitType } from "@nestjs/swagger";
import { MeasurementUnit } from "@prisma/client";
import { Type } from "class-transformer";
import { IsNumber, IsEnum, IsPositive, ValidateNested, IsDateString } from "class-validator";
import { ClientDto } from "./client.dto";

export class ObservationValueDto {
  @ApiProperty({ example: 0.3 })
  @IsNumber()
  @IsPositive()
  value: number;

  @ApiProperty({ example: 'mgdl', enum: MeasurementUnit })
  @IsEnum(MeasurementUnit)
  unit: MeasurementUnit;
}

export class ObservationDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => ClientDto)
  client: ClientDto;

  @ApiProperty({ example: '2019-04-02' })
  @IsDateString()
  dateTesting: Date;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ObservationValueDto)
  creatine?: ObservationValueDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ObservationValueDto)
  chloride?: ObservationValueDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ObservationValueDto)
  fastingGlucose?: ObservationValueDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ObservationValueDto)
  potassium?: ObservationValueDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ObservationValueDto)
  sodium?: ObservationValueDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ObservationValueDto)
  totalCalcium?: ObservationValueDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ObservationValueDto)
  totalProtein?: ObservationValueDto;
}

export class CreateObservationDto extends OmitType(ObservationDto, [
  'client'
]) {}

export class CreateManyObservationDto {
  @ApiProperty({
    type: ClientDto,
  })
  @ValidateNested()
  @Type(() => ClientDto)
  client: ClientDto;


  @ApiProperty({
    type: [CreateObservationDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateObservationDto)
  observations: CreateObservationDto[];
}
