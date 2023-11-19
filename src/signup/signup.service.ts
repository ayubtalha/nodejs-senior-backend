import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateCustomerData } from 'src/customer/dto/customer.input';
import { Customer } from 'src/lib/entities/customer.entity';
import { PrismaService } from 'src/prisma.service';
import { ActivationData } from './dto/activation.input';

@Injectable()
export class SignupService {
  constructor(private prisma: PrismaService) {}

  async signUp(newSignedCustomer: CreateCustomerData) {
    const customer: Customer = await this.prisma.customer.create({
      data: newSignedCustomer,
    });

    if (!customer) throw new ServiceUnavailableException();

    return this.prisma.customerActivationCodesData.create({
      data: {
        customerActivationCode: (Math.random() * 1000000).toFixed(0),
        customerId: customer.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async activate(activation: ActivationData) {
    const customerActivationCode =
      await this.prisma.customerActivationCodesData.findFirst({
        where: {
          customerActivationCode: activation.customerActivationCode,
          customerId: activation.customerId,
        },
      });

    if (!customerActivationCode || !!customerActivationCode.activationDate) {
      throw new BadRequestException();
    }

    return this.prisma.customerActivationCodesData.update({
      data: { activationDate: new Date() },
      where: { id: customerActivationCode.id },
    });
  }
}
