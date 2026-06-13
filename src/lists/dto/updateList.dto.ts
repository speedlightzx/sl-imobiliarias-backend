import { IsHexColor, IsOptional, IsString, MaxLength } from 'class-validator';

export class updateListDTO {
  @IsString()
  @IsOptional()
  @MaxLength(40)
  name!: string;

  @IsHexColor()
  @IsOptional()
  color!: string;
}
