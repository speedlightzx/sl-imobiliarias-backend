import { IsString } from 'class-validator';

export class messageDTO {
  @IsString()
  message!: string;
}
