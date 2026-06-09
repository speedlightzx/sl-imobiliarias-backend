import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService:JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = req.cookies.session_token
    if(!token) throw new UnauthorizedException('Token ausente.')

    try {
      const payload = await this.jwtService.verifyAsync(token)

      req.userId = payload.userId
    } catch(e) {
      throw new UnauthorizedException("Token inválido.")
    }

    return true;
  }
}
