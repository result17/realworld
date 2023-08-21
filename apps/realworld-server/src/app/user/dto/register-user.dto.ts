import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class RegisterUserDto extends PickType(CreateUserDto, ['email', 'username', 'password'] as const) {}
