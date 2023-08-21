import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Put
} from "@nestjs/common";
import { UserService } from "./user.service";


import { Public } from "../decorators/auth";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { ReqUser } from "../decorators/params";
import { type User } from "prisma/prisma-client";
import { type AuthUserVo } from "./vo";

import { RegisterUserRequest, UpdateUserRequest } from "./request";

import { AuthPayload } from "../auth/types";

/**
 * DOC
 * https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints/
 */

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) { }

  private static buildAuthUserVo(user: User, token: string): AuthUserVo {
    const { username, email, bio, image } = user;
    return {
      user: {
        token,
        username,
        email,
        bio,
        image,
      },
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("users/login")
  login(@ReqUser() user: User): AuthUserVo {
    const { token } = this.authService.login(user);
    return UserController.buildAuthUserVo(user, token);
  }

  @Public()
  @Post()
  async register(@Body() request: RegisterUserRequest) {
    const { username, email, password } = request.user;

    // TODO PASSWORD HASH
    // const hashedPassword = await bcrypt.hash(password, 10);

    const [existingUserByEmail, existingUserByUsername] = await Promise.all([
      this.userService.findByEmail(email),
      this.userService.findByUsername(username),
    ]);

    if (existingUserByEmail || existingUserByUsername) {
      throw new HttpException(
        `${existingUserByEmail
          ? "email has already been taken"
          : "has already been taken"
        }`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.userService.create({
      username,
      email,
      password,
      bio: null,
      image: null,
      demo: false,
    });

    const { token } = this.authService.login(user);

    return UserController.buildAuthUserVo(user, token);
  }

  @Get("users")
  async query(
    @ReqUser() { id }: AuthPayload,
    @Headers("Authorization") auth: string,
  ): Promise<AuthUserVo> {
    const token = auth.split(" ")[1];

    if (!token) {
      throw new HttpException("Auth failed", HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.findById(id);

    if (!user) {
      throw new HttpException("Auth failed", HttpStatus.UNAUTHORIZED);
    }

    return UserController.buildAuthUserVo(user, token);
  }

  @Put("user")
  async update(@Body() request: UpdateUserRequest, @ReqUser() { id }: AuthPayload, @Headers("Authorization") auth: string,): Promise<AuthUserVo> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new HttpException("Auth failed", HttpStatus.UNAUTHORIZED);
    }

    const { email, bio, image } = request.user
    const newUser = await this.userService.updateById(id, {
      email,
      bio,
      image
    });

    const token = auth.split(" ")[1];

    if (!token) {
      throw new HttpException("Auth failed", HttpStatus.UNAUTHORIZED);
    }

    return UserController.buildAuthUserVo(newUser, token);
  }
}
