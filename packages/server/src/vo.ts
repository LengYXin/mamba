import { Rule, RuleType } from "@midwayjs/decorator";
import { CreateApiPropertyDoc } from "@midwayjs/swagger";
// import Dayjs from 'dayjs';
// import fs from 'fs-extra';
// import lodash from 'lodash';
// import Mock from 'mockjs';
// import path from 'path';
export enum EnumGender {
  /** 男 */
  Male = 1,
  /** 女 */
  Girl = 2
}
export class PaginationQueryVO {
  @CreateApiPropertyDoc('当前页码')
  @Rule(RuleType.number().default(1))
  current: number;

  @CreateApiPropertyDoc('每页条数')
  @Rule(RuleType.number().default(10))
  pageSize: number;

  @CreateApiPropertyDoc('筛选条件')
  @Rule(RuleType.object().default({}))
  filter: Object;

  @CreateApiPropertyDoc('排序')
  @Rule(RuleType.object().default({}))
  sort: Object;
}
export class PaginationBodyVO {
  @CreateApiPropertyDoc('唯一值 guid')
  @Rule(RuleType.string())
  key: string;

  @CreateApiPropertyDoc('名字')
  @Rule(RuleType.string().required())
  name: string;

  @CreateApiPropertyDoc('头像地址')
  @Rule(RuleType.string())
  avatar: string;

  @CreateApiPropertyDoc('出生日期')
  @Rule(RuleType.date().required())
  birthday: number;

  @CreateApiPropertyDoc('性别')
  @Rule(RuleType.string().required())
  gender: EnumGender;

  @CreateApiPropertyDoc('简介')
  @Rule(RuleType.string())
  introduce: string;

  @CreateApiPropertyDoc('创建时间')
  @Rule(RuleType.date())
  createDate: number;
}

// @Provide()
// export class MockDB {
//   constructor() {
//     this.createMock()
//   }
//   mockFile = path.join(__dirname, 'mock.json');
//   mockData: Array<any> = [];
//   createMock() {
//     if (this.mockData.length) {
//       return
//     }
//     // 检查文件是否存在
//     if (fs.existsSync(this.mockFile)) {
//       this.mockData = fs.readJSONSync(this.mockFile)
//       return
//     }
//     // 创建随机数据
//     const data = lodash.range(100).map(this.create);
//     this.mockData = data;
//     // 写入数据
//     return this.writeJson()
//   }
//   writeJson() {
//     fs.writeJson(this.mockFile, lodash.map(this.mockData, (x, index) => lodash.assign({ index }, x)), { spaces: 4 })
//     return this.mockData
//   }
//   create() {
//     const name = Mock.Random.cname()
//     return {
//       key: Mock.Random.guid(),
//       name,
//       // 头像
//       avatar: Mock.Random.image('100x100', Mock.Random.color(), Mock.Random.color(), 'png', name),
//       // 生日
//       birthday: Dayjs(Mock.Random.date('yyyy-MM-dd')).valueOf(),
//       // 性别
//       gender: lodash.sample([EnumGender.Male, EnumGender.Girl]),
//       // 简介
//       introduce: Mock.Random.cparagraph(),
//       // 创建时间
//       createDate: Date.now(),
//     }
//   }
//   getJson(current, pageSize) {
//     return lodash.slice(this.mockData, (current - 1) * pageSize, current * pageSize)
//   }
//   /**
//    * 添加
//    * @param body 
//    * @returns 
//    */
//   async insert(body: PaginationBodyVO) {
//     console.log("LENG ~ MockService ~ insert ~ body", body)
//     const data = lodash.assign(this.create(), lodash.omit(body, ['key']));
//     this.mockData.push(data);
//     this.writeJson();
//     return data
//   }
//   /**
//   * 查找
//   * @param body 
//   * @returns 
//   */
//   find(key) {
//     return lodash.find(this.mockData, ['key', key])
//   }
//   async update(body: PaginationBodyVO) {
//     if (body.key) {
//       const data = this.find(body.key);
//       if (data) {
//         lodash.assign(data, body);
//         this.writeJson()
//         return data
//       }
//     }
//     throw 'key is null'
//   }
//   async patch(body: PaginationBodyVO) {
//     if (body.key) {
//       const data = this.find(body.key);
//       if (data) {
//         return this.update(body)
//       }
//     }
//     return this.insert(body)
//   }
// }
