import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { PoliciesGuard } from 'src/modules/auth/guards/policies.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

export function Auth() {
  return applyDecorators(
    UseGuards(
      // phải theo đúng thứ tự JwtAuthGuard->RolesGuard (C1)
      JwtAuthGuard,
      RolesGuard,
      PoliciesGuard,
    ),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}
