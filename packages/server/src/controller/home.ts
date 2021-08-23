import { Controller, Get, Provide, Redirect } from '@midwayjs/decorator';

@Provide()
@Controller('/')
export class HomeController {
  @Get('/')
  @Redirect('/swagger-ui/index.html')
  async home() {
    return 'Hello Midwayjs!';
  }
}
