import { Provide } from "@midwayjs/decorator";
import Dayjs from 'dayjs';
import fs from 'fs-extra';
import lodash from 'lodash';
import Mock from 'mockjs';
import path from 'path';
import { EnumGender, PaginationBodyVO } from "../vo";

@Provide()
export class MockDBService {
    constructor() {
        this.createMock()
    }
    mockFile = path.join(__dirname, 'mock.json');
    mockData: Array<PaginationBodyVO> = [];
    createMock() {
        if (this.mockData.length) {
            return
        }
        // 检查文件是否存在
        if (fs.existsSync(this.mockFile)) {
            this.mockData = fs.readJSONSync(this.mockFile)
            return
        }
        // 创建随机数据
        const data = lodash.range(100).map<PaginationBodyVO>(this.create);
        this.mockData = data;
        // 写入数据
        return this.writeJson()
    }
    writeJson() {
        fs.writeJsonSync(this.mockFile, lodash.map(this.mockData, (x, index) => lodash.assign(x, { index })), { spaces: 4 })
        return this.mockData
    }
    create(): PaginationBodyVO {
        const name = Mock.Random.cname()
        return {
            key: Mock.Random.guid(),
            name,
            // 头像
            avatar: Mock.Random.image('100x100', Mock.Random.color(), Mock.Random.color(), 'png', name),
            // 生日
            birthday: Dayjs(Mock.Random.date('yyyy-MM-dd')).valueOf(),
            // 性别
            gender: lodash.sample([EnumGender.Male, EnumGender.Girl]) as any,
            // 简介
            introduce: Mock.Random.cparagraph(),
            // 创建时间
            createDate: Date.now(),
        }
    }
    getJson(current, pageSize) {
        return lodash.slice(this.mockData, (current - 1) * pageSize, current * pageSize)
    }
    /**
     * 添加
     * @param body 
     * @returns 
     */
    async insert(body: PaginationBodyVO) {
        const data = lodash.assign(this.create(), lodash.omit(body, ['key', 'index', 'createDate']));
        this.mockData.unshift(data);
        this.writeJson();
        return data
    }
    /**
    * 查找
    * @param body 
    * @returns 
    */
    find(key) {
        return lodash.find(this.mockData, ['key', key])
    }
    async update(body: PaginationBodyVO) {
        if (body.key) {
            const data = this.find(body.key);
            if (data) {
                lodash.assign(data, body);
                this.writeJson()
                return data
            }
        }
        throw 'key is null'
    }
    async delete(keys) {
        const rems = lodash.remove(this.mockData, item => lodash.includes(keys, item.key));
        this.writeJson()
        return rems
    }
    async patch(body: PaginationBodyVO) {
        try {
            const res = await this.update(body)
            return res
        } catch (error) {
            return this.insert(body)
        }
    }
}
