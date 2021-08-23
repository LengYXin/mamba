import { BindAll } from 'lodash-decorators';
import React from 'react';
@BindAll()
export class noRowsOverlayComponent extends React.Component {
    render() {
        return (
            <React.Antd.Empty description={false} />
        )
    }
}

