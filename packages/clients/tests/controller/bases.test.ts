import { AjaxBasics, BasesController, basesOptions } from '../../'
import lodash from 'lodash'
type entity = {
    key: string;
    name: string;
    avatar: string;
    birthday: string;
    gender: string;
    introduce: string;
};
AjaxBasics.defaultAjaxConfig.target = 'http://127.0.0.1:7001'
const controller = new BasesController<entity>({
    // target: 'http://127.0.0.1:7001/api/mock',
    target: '/api/mock',
});
it('onLoad', async () => {
    await controller.onLoad();
    expect(lodash.size(controller.dataSource) > 0).toBe(true)
});
it('onFind', async () => {
    // 随机取一条数据
    const data = lodash.sample(controller.dataSource);
    await controller.onFind(data);
    expect(data.key).toEqual(controller.entity.key)
});
it('onDelete', async () => {
    const size = 1;
    // 随机数据
    const data = lodash.sampleSize(controller.dataSource, size);
    const dels = await controller.onDelete(data);
    expect(lodash.size(controller.dataSource)).toEqual(basesOptions.paginationParams.defaultPageSize - size)
    expect(lodash.isEqual(lodash.sortBy(data, 'key'), lodash.sortBy(dels, 'key'))).toBe(true)
});
it('onUpdate', async () => {
    // 随机取一条数据
    const data = lodash.sample(controller.dataSource);
    data.name = `LENG-${Date.now()}`
    const entity = await controller.onUpdate(data);
    expect(lodash.pick(data, ['key', 'name'])).toEqual(lodash.pick(entity, ['key', 'name']))
});
