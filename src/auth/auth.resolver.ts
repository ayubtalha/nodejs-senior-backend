import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthOutput, LoginInput } from './dto/auth.input';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Customer } from 'src/lib/entities/customer.entity';
import { User } from 'src/lib/decorators/user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => AuthOutput)
  async login(
    @Args('data') { username, password }: LoginInput,
  ): Promise<AuthOutput> {
    return this.authService.findByCustomerEmailAndPassword({
      username,
      password,
    });
  }

  @UseGuards(AuthGuard)
  @Query(() => Customer)
  async currentLoggedUser(@User() user: any) {
    return this.authService.currentLoggedUser(user.customerId);
  }
}
