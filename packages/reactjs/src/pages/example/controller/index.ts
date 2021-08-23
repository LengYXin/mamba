import React from 'react';
export * from './entity';
export class PageController extends React.BasesController {
    constructor() {
        super({
            target: 'http://127.0.0.1:7001/api/mock',
            // listModel: { storageKey: '_le_example' }
        })
    }
}
export default new PageController()