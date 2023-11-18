import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

export const jwtAuthConstants = {
  superSecrteKey: 'some-super-secret-key',
};

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtAuthConstants.superSecrteKey,
      signOptions: { expiresIn: '5h' },
    }),
  ],
  providers: [AuthResolver, AuthService, PrismaService],
})
export class AuthModule {}
