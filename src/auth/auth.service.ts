import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(body: AuthDto) {
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
  }

  login() {}

  logout() {}
}
