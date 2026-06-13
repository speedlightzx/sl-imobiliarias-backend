import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { authCredentialsDTO } from './dto/authCredentials.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/schemas/schemas';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('db')
    private readonly db: NodePgDatabase<typeof schema>,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: authCredentialsDTO) {
    const [user] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, credentials.email));

    if (!user) throw new UnauthorizedException('Credenciais inválidas.');

    const isValidPassword = await argon2.verify(
      user.password,
      credentials.password,
    );
    if (!isValidPassword)
      throw new UnauthorizedException('Credenciais inválidas.');

    const token = await this.jwtService.signAsync({ userId: user.id });
    return token;
  }

  async register(credentials: authCredentialsDTO) {
    const [userAlreadyExists] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, credentials.email));

    if (userAlreadyExists) throw new ConflictException('Email já cadastrado.');

    await this.db.insert(schema.users).values({
      email: credentials.email,
      password: await argon2.hash(credentials.password),
    });
  }

  async isValidToken(token: string): Promise<boolean> {
    if (!token) return false;

    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
