import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskManagerModule } from './task-manager/task-manager.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ScanTrackingModule } from './scan-tracking/scan-tracking.module';
import { FormsModule } from './forms/forms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '167.71.36.250',
      port: 5432,
      username: 'postgres',
      password: 'qaaNGvi5CSQ968tv3v1hSemg1gc',
      database: 'oms',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    TaskManagerModule,
    ScanTrackingModule,
    FormsModule,
    UserModule,
    AuthenticationModule,
    FormsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
