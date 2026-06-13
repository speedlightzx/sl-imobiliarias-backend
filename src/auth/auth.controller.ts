import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { authCredentialsDTO } from './dto/authCredentials.dto';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: authCredentialsDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(body);

    res.cookie('session_token', token, {
      httpOnly: true,
      secure: false, //deixei false por se tratar de um teste técnico que será testado localmente
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1h
    });
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: authCredentialsDTO) {
    return await this.authService.register(body);
  }
}
