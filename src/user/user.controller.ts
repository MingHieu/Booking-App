import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('infor')
  getInfo(@GetUser('uid') userUid: string) {
    return this.userService.getInfor(userUid);
  }

  @Post('edit')
  editInfo(
    @GetUser('uid') userUid: string,
    @Body(new ValidationPipe()) body: UserDto,
  ) {
    return this.userService.editInfo(userUid, body);
  }
}
