import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: AuthDto) {
    return this.authService.signup(body);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body(new ValidationPipe()) body: AuthDto) {
    return this.authService.login(body);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
