import { ALL, Body, Controller, Del, Get, Inject, Param, Patch, Post, Provide, Put, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import lodash from 'lodash';
import { MockDBService } from '../service/db';
import { PaginationBodyVO, PaginationQueryVO } from '../vo';
@Provide()
@Controller('/api/mock', { tagName: 'restful mock 数据接口', description: 'mock 数据接口' })
export class MockController {
  @Inject()
  ctx: Context;
  @Inject()
  mock: MockDBService;
  async delay() {
    return new Promise((res, rej) => lodash.delay(res, 1000))
  }
  @Get('/', { summary: '获取数据' })
  async get(@Query(ALL) query: PaginationQueryVO): Promise<any> {
    console.log()
    console.log("MockController ~  get ~ query", query);
    query.current = lodash.toNumber(query.current) || 1;
    query.pageSize = lodash.toNumber(query.pageSize) || 10;
    const dataSource = this.mock.getJson(query.current, query.pageSize);
    await this.delay()
    return lodash.assign({ total: this.mock.mockData.length }, lodash.pick(query, ['current', 'pageSize', 'filter', 'sort']), { dataSource });
  }
  @Get('/:key', { summary: 'UID获取详情' })
  async find(@Param() key: string): Promise<any> {
    console.log()
    console.log("MockController ~  patch ~ key", key);
    const data = this.mock.find(key);
    await this.delay()
    if (data) {
      return data;
    }
    this.ctx.status = 400
    return {
      errorCode: 1,
      message: '没有找到对应的数据',
    }
  }
  @Get('/:key/role', { summary: '关联角色' })
  async find2(@Param() key: string): Promise<any> {
    console.log()
    console.log("MockController ~  patch ~ key", key);
    const data = this.mock.find(key);
    await this.delay()
    if (data) {
      return data;
    }
    this.ctx.status = 401
    return {
      errorCode: 1,
      message: '没有找到对应的数据',
    }
  }
  @Patch('/', { summary: '编辑更新 未查找到则添加一条新数据' })
  async patch(@Body(ALL) body: PaginationBodyVO): Promise<any> {
    console.log()
    console.log("MockController ~  patch ~ body", body);
    await this.delay()
    return this.mock.patch(body);
  }
  @Post('/', { summary: '创建一条新数据' })
  async insert(@Body(ALL) body: PaginationBodyVO): Promise<any> {
    console.log()
    console.log("MockController ~  insert ~ body", body);
    await this.delay()
    return this.mock.insert(body);
  }
  @Put('/:key', { summary: '更新数据' })
  async update(@Param() key: string, @Body(ALL) body: PaginationBodyVO): Promise<any> {
    console.log()
    console.log("MockController ~  update ~ body", body);
    await this.delay()
    return this.mock.update(body)
  }
  @Put('/:key/disable', { summary: '启用/禁用' })
  async disable(@Param() key: string, @Query() disable: boolean): Promise<any> {
    return true
  }
  @Put('/:key/publish', { summary: '发布/取消' })
  async publish(@Param() key: string, @Query() publish: boolean): Promise<any> {
    return true
  }
  @Del('/', { summary: '删除数据 多选', description: `["Fdb8FB8E-d8DE-b4aC-cB9d-3aB4072dC4F9","260d4BFE-1Fd6-eeF8-F6E2-686b9bF1db9B"]` })
  async delete(@Body(ALL) keys: Array<String>): Promise<any> {
    console.log()
    console.log("MockController ~  delete ~ keys", keys);
    await this.delay()
    return this.mock.delete(keys)
  }

}
