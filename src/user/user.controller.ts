import { UserService } from './user.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('infor')
  getInfo(@GetUser('uid') userUid: string) {
    return this.userService.getInfor(userUid);
  }
}
