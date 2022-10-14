import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FileUserRepository } from './adapters/driven/file-users.repository';
import { AuthenticationController } from './adapters/driving/authentication.controller';
import { JwtStrategy } from './adapters/driving/passport/jwt.strategy';
import { LocalStrategy } from './adapters/driving/passport/local.strategy';
import { UserService } from './domain/inboudPorts/UserService';
import { IUserRepository } from './domain/outboudPorts/IUserRepository';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get<string>('SENDGRID_API_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: UserService,
      useClass: UserService,
    },
    {
      provide: IUserRepository,
      useClass: FileUserRepository,
      // useClass: MemoryUsersRepository
    },
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [UserService],
})
export class AuthModule {}
