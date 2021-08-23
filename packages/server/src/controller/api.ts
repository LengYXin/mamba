import { Body, Controller, Inject, Post, Provide, Query, Rule, RuleType } from '@midwayjs/decorator';
import { CreateApiPropertyDoc } from '@midwayjs/swagger';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';
class UserVO {
  @CreateApiPropertyDoc('user name')
  @Rule(RuleType.string().required())
  name: string;

  @CreateApiPropertyDoc('user age')
  @Rule(RuleType.number())
  age: number;
}
@Provide()
@Controller('/api', { tagName: '测试Tag', description: '测试 description' })
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;
  @Post('/get_user', { description: '接口描述', summary: '接口备注' })
  async getUser(@Query() uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
  @Post('/user_info', { summary: 'Main Page', description: 'This is a home router' })
  async home(@Body() user: UserVO): Promise<UserVO> {
    console.log(`user: ${JSON.stringify(user)}`)
    return 'Hello Midwayjs!' as any;
  }
}

