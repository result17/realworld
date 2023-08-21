import { RegisterUserDto } from '../dto/register-user.dto'
import {
  IsNotEmpty, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer'

export class RegisterUserRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RegisterUserDto)
  user: RegisterUserDto
}
