import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { SignupService } from './signup.service';
import { CreateCustomerData } from 'src/customer/dto/customer.input';
import { ActivationCode } from 'src/lib/entities/customerActivationCode.entity';
import { ActivationData } from './dto/activation.input';

@Resolver()
export class SignupResolver {
  constructor(private readonly signupService: SignupService) {}

  @Mutation((returns) => ActivationCode)
  async signUp(@Args('data') customer: CreateCustomerData) {
    return this.signupService.signUp(customer);
  }

  @Mutation((returns) => ActivationCode)
  async activate(@Args('data') activation: ActivationData) {
    return this.signupService.activate(activation);
  }
}
