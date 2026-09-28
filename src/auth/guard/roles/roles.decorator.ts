import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../../user/user.entity.js';

export const Roles = (...roles: UserRole[]) =>
  SetMetadata('roles', roles);