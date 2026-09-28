import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth/jwt-auth.guard.js';
import { Req } from '@nestjs/common';
import { RolesGuard } from '../auth/guard/roles/roles.guard.js';
import { UserRole } from '../user/user.entity.js';
import { Roles } from '../auth/guard/roles/roles.decorator.js';




@Controller('test')
export class TestController {

@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  test(@Req() request: any) {
    return request.user;
  }
}
