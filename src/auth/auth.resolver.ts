import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthOutput, LoginInput } from './dto/auth.input';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Customer } from 'src/lib/entities/customer.entity';
import { User } from 'src/lib/decorator/user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => AuthOutput)
  async login(
    @Args('data') { email, password }: LoginInput,
  ): Promise<AuthOutput> {
    return this.authService.findByCustomerEmailAndPassword({ email, password });
  }

  @UseGuards(AuthGuard)
  @Query(() => Customer)
  async currentLoggedUser(@User() user: any) {
    return this.authService.currentLoggedUser(user.sub);
  }
}
