import { Module } from '@nestjs/common';
import { TestController } from './test.controller.js';
import { AuthModule } from '../auth/auth.module.js';
@Module({
  imports: [AuthModule],
  controllers: [TestController]
})
export class TestModule {}
