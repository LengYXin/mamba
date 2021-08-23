import { BasesController } from "@mamba/clients";
export * from './entity';

export class PageController extends BasesController {
    constructor() {
        super()
        this.reset({
            target: 'http://127.0.0.1:7001/api/mock',
        })
    }
}

export default new PageController()