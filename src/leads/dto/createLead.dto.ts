import { IsEnum, IsInt, IsString, MaxLength } from 'class-validator';
import { LeadStatus } from '@/types/LeadStatusEnum';
import { LeadTemperature } from '@/types/LeadTemperatureEnum';

export class createLeadDTO {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsEnum(LeadTemperature)
  temperature!: LeadTemperature;

  @IsEnum(LeadStatus)
  status!: LeadStatus;

  @IsInt()
  listId!: number;
}
