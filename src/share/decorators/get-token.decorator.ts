import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export enum EKeyToken {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
}

export const GetToken = createParamDecorator(
  (key: keyof typeof EKeyToken, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers[key];
    return token || null;
  },
);
