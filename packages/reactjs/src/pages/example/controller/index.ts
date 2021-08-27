import React from 'react';
export * from './entity';
export class PageController extends React.BasesController {
    constructor() {
        super({
            target: '/api/mock',
            // listModel: { storageKey: '_le_example' }
        })
    }
}
export default new PageController()