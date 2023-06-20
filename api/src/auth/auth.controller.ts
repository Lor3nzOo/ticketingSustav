import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  register(@Body() user) {
    return this.authService.register(user)
  }

  @Post('/login')
  login(@Body() user, @Res() res) {
    return this.authService.login(user, res)
  }

  @Get('/session')
  async Session(@Req() req) {
    return this.authService.session(req)
  }

  @Get('/allUsers')
  async allUsers() {
    return this.authService.allUsers()
  }

  @Post('/deleteUser')
  async delete(@Body() user) {
    return this.authService.deleteUser(user)
  }
}
