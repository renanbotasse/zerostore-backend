import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { authorizationToLoginPayload } from 'src/utils/base-64-converter';

export const UserId = createParamDecorator((__, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayload = authorizationToLoginPayload(authorization);

  console.log(authorization);

  return loginPayload?.id;
});
