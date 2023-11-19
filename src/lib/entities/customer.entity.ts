import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'src/lib/entities/customerBase.entity';

@ObjectType()
export class Customer extends Base {
  @Field(() => String)
  email: string;
  @Field(() => String, { nullable: false })
  role: string;
}
