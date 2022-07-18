import { BasesController } from "@mamba/clients";
export * from './entity';

export class PageController extends BasesController {
    constructor() {
        super()
        this.reset({
            target: '/api/mock',
        })
    }
}

export default new PageController()