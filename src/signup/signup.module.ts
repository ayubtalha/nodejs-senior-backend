import { Module } from '@nestjs/common';
import { SignupResolver } from './signup.resolver';
import { SignupService } from './signup.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SignupResolver, SignupService, PrismaService],
})
export class SignupModule {}
