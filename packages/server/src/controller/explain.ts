import { ALL, Body, Controller, Del, Get, Inject, Param, Patch, Post, Provide, Put, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import lodash from 'lodash';
import { MockDBService } from '../service/db';
import { PaginationBodyVO, PaginationQueryVO } from '../vo';
@Provide()
@Controller('/api/explain', { tagName: '解释型 mock 数据接口', description: 'mock 数据接口' })
export class ExplainController {
  @Inject()
  ctx: Context;
  @Inject()
  mock: MockDBService;

  @Get('/get', { summary: '获取数据' })
  async get(@Query(ALL) query: PaginationQueryVO): Promise<any> {
    console.log()
    console.log("ExplainController ~  get ~ query", query);
    query.current = lodash.toNumber(query.current) || 1;
    query.pageSize = lodash.toNumber(query.pageSize) || 10;
    if (lodash.isString(query.filter)) {
      // 模糊
    } else if (lodash.isObject(query.filter)) {
      // 精准
    }
    const dataSource = this.mock.getJson(query.current, query.pageSize);
    return lodash.assign({ total: this.mock.mockData.length }, lodash.pick(query, ['current', 'pageSize']), { dataSource });
  }
  @Get('/find/:key', { summary: 'UID获取详情' })
  async find(@Param() key: string): Promise<any> {
    console.log()
    console.log("ExplainController ~  patch ~ key", key);
    const data = this.mock.find(key);
    if (data) {
      return data;
    }
    this.ctx.status = 404
  }
  @Patch('/edit', { summary: '编辑更新 未查找到则添加一条新数据' })
  async patch(@Body(ALL) body: PaginationBodyVO): Promise<any> {
    console.log()
    console.log("ExplainController ~  patch ~ body", body);
    return this.mock.patch(body);
  }
  @Post('/insert', { summary: '创建一条新数据' })
  async insert(@Body(ALL) body: PaginationBodyVO): Promise<any> {
    console.log()
    console.log("ExplainController ~  insert ~ body", body);
    return this.mock.insert(body);
  }
  @Put('/update/:key', { summary: '更新数据' })
  async update(@Body(ALL) body: PaginationBodyVO): Promise<any> {
    console.log()
    console.log("ExplainController ~  update ~ body", body);
    return this.mock.update(body)
  }
  @Del('/delete', { summary: '删除数据 多选', description: `["Fdb8FB8E-d8DE-b4aC-cB9d-3aB4072dC4F9","260d4BFE-1Fd6-eeF8-F6E2-686b9bF1db9B"]` })
  async delete(@Body(ALL) keys: Array<String>): Promise<any> {
    console.log()
    console.log("ExplainController ~  delete ~ keys", keys);
    return this.mock.delete(keys)
  }

}
