import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { LeadTemperature } from '@/types/LeadTemperatureEnum';
import { LeadStatus } from '@/types/LeadStatusEnum';

export class updateLeadDTO {
  @IsString()
  @MaxLength(120)
  @IsOptional()
  name!: string;

  @IsEnum(LeadTemperature)
  @IsOptional()
  temperature!: LeadTemperature;

  @IsEnum(LeadStatus)
  @IsOptional()
  status!: LeadStatus;

  @IsInt()
  @IsOptional()
  listId!: number;
}
