import { ApiProperty } from "@nestjs/swagger";
import { Ethnicity, Gender } from "@prisma/client";
import { IsDateString, IsEnum, IsString } from "class-validator";

export class ClientDto {
  @ApiProperty({ example: '02260a19' })
  @IsString()
  id: string;
  
  @ApiProperty({ example: '2019-04-02' })
  @IsDateString()
  birthdayDate: Date;
  
  @ApiProperty({
    example: Gender.Female,
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;
  
  @ApiProperty({
    example: Ethnicity.Asian,
    enum: Ethnicity,
  })
  @IsEnum(Ethnicity)
  ethnicity: Ethnicity;
}

export class CreateClientDto extends ClientDto {}
