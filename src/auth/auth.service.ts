import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtSevice: JwtService) {}

  async signup(body: AuthDto) {
    try {
      const hashPassword = await argon.hash(body.password);
      const user = await this.prisma.user.create({
        data: {
          username: body.username,
          password: hashPassword,
          role: 1,
          uid: uuidv4(),
        },
      });
      delete user.password;
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          throw new ForbiddenException('username is already taken');
        }
      }
      throw e;
    }
  }

  async login(props: AuthDto) {
    const { username, password } = props;

    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) return null;

    const isPasswordCorrect = await argon.verify(user.password, password);
    if (!isPasswordCorrect) return null;

    console.log(
      this.jwtSevice.verify(user.token, {
       
      }),
    );

    const retUser = await this.prisma.user.update({
      where: {
        username: username,
      },
      data: {
        token: this.jwtSevice.sign(props),
      },
    });
    delete retUser.password;
    return retUser;
  }

  logout() {}
}
