import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = GqlExecutionContext.create(context).getContext().req;

    const user = request.user;
    if (!this.matchRoles(roles, user.role)) throw new UnauthorizedException();
    return true;
  }

  private matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }
}
