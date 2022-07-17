import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getInfor(userUid: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        uid: userUid,
      },
    });
    delete user.password;
    return user;
  }
}
