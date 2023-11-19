import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCustomerData,
  ObtainCustomerViaIdOrEmail,
  GetCustomerData,
  UpdateCustomerData,
} from './dto/customer.input';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: GetCustomerData) {
    const { skip, take, cursor, where } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async create(newSignedCustomer: CreateCustomerData) {
    return this.prisma.customer.create({ data: newSignedCustomer });
  }

  async getByIdOrEmail(params: ObtainCustomerViaIdOrEmail) {
    return this.prisma.customer.findFirst({
      where: params,
    });
  }

  async update(updatedCustomer: UpdateCustomerData) {
    return this.prisma.customer.update({
      data: updatedCustomer,
      where: { id: updatedCustomer.id },
    });
  }

  async delete(id: string) {
    return this.prisma.customer.delete({ where: { id } });
  }
}
