import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [DatabaseModule, AuthModule, ListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
