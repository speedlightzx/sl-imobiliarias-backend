import { IsHexColor, IsOptional, IsString, MaxLength } from 'class-validator';

export class createListDTO {
  @IsString()
  @MaxLength(40)
  name!: string;

  @IsHexColor()
  @IsOptional()
  color!: string;
}
