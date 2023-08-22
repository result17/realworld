import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  body: string;
}
