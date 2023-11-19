import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: false })
  username: string;
  @Field(() => String, { nullable: false })
  password: string;
}

@ObjectType()
export class AuthOutput {
  @Field(() => String, { nullable: false })
  token: string;
}
