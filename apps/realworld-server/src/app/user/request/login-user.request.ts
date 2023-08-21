import { LoginUserDto } from '../dto/login-user.dto'
import {
  IsNotEmpty, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer'

export class LoginUserRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LoginUserDto)
  user: LoginUserDto
}
