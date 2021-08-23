import { ALL, Body, Controller, Get, Inject, Patch, Post, Provide, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import lodash from 'lodash';
import { MockDBService } from '../service/db';
import { PaginationBodyVO, PaginationQueryVO } from '../vo';
@Provide()
@Controller('/api', { tagName: '乱七八糟型 mock 数据接口', description: 'mock 数据接口' })
export class DisorderlyController {
  @Inject()
  ctx: Context;
  @Inject()
  mock: MockDBService;

  @Post('/aaa/list', { summary: '获取数据' })
  async get(@Body(ALL) query: PaginationQueryVO): Promise<any> {
    console.log()
    console.log("DisorderlyController ~  get ~ query", query);
    query.current = lodash.toNumber(query.current) || 1;
    query.pageSize = lodash.toNumber(query.pageSize) || 10;
    const dataSource = this.mock.getJson(query.current, query.pageSize);
    return lodash.assign({ total: this.mock.mockData.length }, lodash.pick(query, ['current', 'pageSize']), { dataSource });
  }
  @Get('/user/details/:userid', { summary: 'UID获取详情' })
  async user(@Query() key: string): Promise<any> {
    console.log()
    console.log("DisorderlyController ~  patch ~ key", key);
    const data = this.mock.find(key);
    if (data) {
      return data;
    }
    this.ctx.status = 404
  }
  @Get('/bbb/details', { summary: 'UID获取详情' })
  async find(@Query() key: string): Promise<any> {
    console.log()
    console.log("DisorderlyController ~  patch ~ key", key);
    const data = this.mock.find(key);
    if (data) {
      return data;
    }
    this.ctx.status = 404
  }
  @Patch('/ccc/edit', { summary: '编辑更新 未查找到则添加一条新数据' })
  async patch(@Body(ALL) body: PaginationBodyVO): Promise<any> {
    console.log()
    console.log("DisorderlyController ~  patch ~ body", body);
    return this.mock.patch(body);
  }
  @Post('/ddd/add', { summary: '创建一条新数据' })
  async insert(@Body(ALL) body: PaginationBodyVO): Promise<any> {
    console.log()
    console.log("DisorderlyController ~  insert ~ body", body);
    return this.mock.insert(body);
  }
  @Post('/eee/update', { summary: '更新数据' })
  async update(@Body(ALL) body: PaginationBodyVO): Promise<any> {
    console.log()
    console.log("DisorderlyController ~  update ~ body", body);
    return this.mock.update(body)
  }
  @Post('/fff/remove', { summary: '删除数据 多选', description: `["Fdb8FB8E-d8DE-b4aC-cB9d-3aB4072dC4F9","260d4BFE-1Fd6-eeF8-F6E2-686b9bF1db9B"]` })
  async delete(@Body(ALL) keys: Array<String>): Promise<any> {
    console.log()
    console.log("DisorderlyController ~  delete ~ keys", keys);
    return this.mock.delete(keys)
  }

}
