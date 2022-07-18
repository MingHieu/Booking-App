import { PrismaService } from 'src/prisma/prisma.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto';

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

  async editInfo(userUid: string, body: UserDto) {
    await this.prisma.user.update({
      where: {
        uid: userUid,
      },
      data: { ...body },
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Success',
    };
  }
}
