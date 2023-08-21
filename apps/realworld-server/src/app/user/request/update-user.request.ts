import { UpdateUserDto } from '../dto/update-user.dto'
import {
  IsNotEmpty, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer'

export class UpdateUserRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user: UpdateUserDto
}
