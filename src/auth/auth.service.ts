import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginInput } from './dto/auth.input';
import { JwtService } from '@nestjs/jwt';
import { Customer } from 'src/lib/entities/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findByCustomerEmailAndPassword(params: LoginInput) {
    const { email, password } = params;

    const customer = await this.prisma.customer.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!customer) {
      throw new UnauthorizedException();
    }

    const payload = { sub: customer.id, email: customer.email };

    return { token: await this.jwtService.signAsync(payload) };
  }

  async currentLoggedUser(id: string): Promise<Customer> {
    const currentLoggedUser = await this.prisma.customer.findUnique({
      where: { id },
    });
    return currentLoggedUser;
  }
}
