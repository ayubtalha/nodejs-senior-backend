import { Base } from './customerBase.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from './customer.entity';

@ObjectType()
export class ActivationCode extends Base {
  @Field(() => Customer)
  customer: Customer;
  @Field(() => String)
  customerActivationCode: string;
  @Field(() => Date, { nullable: true })
  activationDate?: Date;
}
