import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Public } from '../decorators/auth'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {

    const { username, email } = registerUserDto

    // TODO PASSWORD HASH
    // const hashedPassword = await bcrypt.hash(password, 10);

    const [existingUserByEmail, existingUserByUsername] = await Promise.all([
      this.userService.findByEmail(email),
      this.userService.findByUsername(username)
    ]) 
  
  
    if (existingUserByEmail || existingUserByUsername) {
      throw new HttpException(
        `${existingUserByEmail ? 'email has already been taken' : 'has already been taken'}`,
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    return await this.userService.create({
      ...registerUserDto,
      demo: false
    });
  }

  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateById(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeById(+id);
  }
}
