import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtSevice: JwtService,
    private config: ConfigService,
  ) {}

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
          throw new ForbiddenException('Username already exists');
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
    if (!user) throw new ForbiddenException('Username is incorrect');

    const pwMatches = await argon.verify(user.password, password);
    if (!pwMatches) throw new ForbiddenException('Password is incorrect');

    const retUser = await this.prisma.user.update({
      where: {
        username: username,
      },
      data: {
        token: this.signToken(user.id, user.uid),
      },
    });
    delete retUser.password;
    return retUser;
  }

  signToken(userId: number, uid: string) {
    const payload = { sub: userId, uid };

    return this.jwtSevice.sign(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
