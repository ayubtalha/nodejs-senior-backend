import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import {
  CreateCustomerData,
  ObtainCustomerViaIdOrEmail,
  GetCustomerData,
  UpdateCustomerData,
} from './dto/customer.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/auth/authRoles.guard';
import { Roles } from 'src/lib/decorator/authRole.decorator';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Customer])
  async customers(@Args('data') { skip, take, where }: GetCustomerData) {
    return this.customerService.findAll({ skip, take, where });
  }

  @UseGuards(AuthGuard)
  @Query(() => Customer)
  async GetCustomerData(
    @Args('data') { email, id }: ObtainCustomerViaIdOrEmail,
  ) {
    return this.customerService.getByIdOrEmail({ email, id });
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => Customer)
  async CreateCustomerData(@Args('customer') customer: CreateCustomerData) {
    return this.customerService.create(customer);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Mutation((returns) => Customer)
  async UpdateCustomerData(@Args('customer') customer: UpdateCustomerData) {
    return this.customerService.update(customer);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Mutation((returns) => Customer)
  async deleteCustomer(@Args('id') id: string) {
    return this.customerService.delete(id);
  }
}
