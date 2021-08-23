import { BindAll } from 'lodash-decorators';
import React from 'react';
@BindAll()
export class loadingOverlayComponent extends React.Component {
    render() {
        return (
            <div >
                <React.Antd.Spin />
            </div>
        )
    }
}

