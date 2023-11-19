import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ActivationData {
  @Field(() => String, { nullable: false })
  customerId: string;

  @Field(() => String, { nullable: false })
  customerActivationCode: string;
}
