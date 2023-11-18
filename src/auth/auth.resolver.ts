import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthOutput, LoginInput } from './dto/auth.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => AuthOutput)
  async login(
    @Args('data') { email, password }: LoginInput,
  ): Promise<AuthOutput> {
    return this.authService.findByCustomerEmailAndPassword({ email, password });
  }
}
