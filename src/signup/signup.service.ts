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
    try {
      const customer: Customer = await this.prisma.customer.create({
        data: newSignedCustomer,
      });

      if (!customer) {
        console.error('Customer creation failed:', newSignedCustomer);
        throw new ServiceUnavailableException();
      }

      console.log('SignedUp customer successfully:', customer);

      const customerActivationCodesData =
        await this.prisma.customerActivationCodesData.create({
          data: {
            customerActivationCode: Math.floor(
              Math.random() * 1000000,
            ).toString(),
            customerId: customer.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

      return {
        id: customerActivationCodesData.id, //signup id
        customerId: customerActivationCodesData.customerId,
        customerActivationCode:
          customerActivationCodesData.customerActivationCode,
        createdAt: customerActivationCodesData.createdAt,
        updatedAt: customerActivationCodesData.updatedAt,
        customer,
      };
    } catch (error) {
      console.error('Error in signUp:', error);
      throw new ServiceUnavailableException();
    }
  }

  async activate(activation: ActivationData) {
    try {
      const customer = await this.prisma.customer.findFirst({
        where: { id: activation.customerId },
      });

      const customerActivationCode =
        await this.prisma.customerActivationCodesData.findFirst({
          where: {
            customerActivationCode: activation.customerActivationCode,
            customerId: activation.customerId,
          },
        });

      if (!customerActivationCode) {
        throw new BadRequestException();
      }

      const customerActivationCodesData =
        await this.prisma.customerActivationCodesData.update({
          where: { id: customerActivationCode.id },
          data: { activationDate: new Date() },
        });

      console.log('Customer Activated Successfully:', customer);

      return {
        id: customerActivationCodesData.id,
        customerId: customerActivationCodesData.customerId,
        customerActivationCode:
          customerActivationCodesData.customerActivationCode,
        createdAt: customerActivationCodesData.createdAt,
        updatedAt: customerActivationCodesData.updatedAt,
        activation: customerActivationCodesData.activationDate,
        customer,
      };
    } catch (error) {
      console.error('Prisma error:', error);
      throw new BadRequestException('Invalid request to Prisma');
    }
  }
}
