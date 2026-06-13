import { IsEmail, IsString } from 'class-validator';

export class authCredentialsDTO {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
