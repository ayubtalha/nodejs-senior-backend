import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

export const jwtAuthConstants = {
  secret: 'some-super-secret-key',
};

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtAuthConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [AuthResolver, AuthService, PrismaService],
})
export class AuthModule {}
