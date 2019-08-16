import { createParamDecorator } from '@nestjs/common';
import { Users } from '../entities/users.entity';

/**
 * A custom decorator to automatically retrieve the user object from a request
 */
export const GetUser = createParamDecorator((data, req): Users => {
  return req.user;
});
