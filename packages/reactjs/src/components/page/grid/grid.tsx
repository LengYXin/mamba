import { GridReadyEvent, RowDataChangedEvent } from 'ag-grid-community';
import { LicenseManager } from "ag-grid-enterprise";
import { AgGridReact } from 'ag-grid-react';
import { AgGridReactProps } from 'ag-grid-react/lib/interfaces';
import lodash from 'lodash';
import { BindAll, Debounce } from 'lodash-decorators';
import React from 'react';
import * as frameworks from './frameworks';
LicenseManager.setLicenseKey(
    "ag-Grid_Evaluation_License_Not_for_Production_100Devs30_August_2037__MjU4ODczMzg3NzkyMg==9e93ed5f03b0620b142770f2594a23a2"
);
@BindAll()
export default class extends React.Component<AgGridReactProps> {
    onGridReady(event: GridReadyEvent) {
        event.api.sizeColumnsToFit()
        lodash.invoke(this.props, 'onGridReady', event)
    }
    @Debounce(100)
    onRowDataChanged(event: RowDataChangedEvent) {
        event.api.sizeColumnsToFit();
        event.columnApi.autoSizeColumn("RowAction");
        lodash.invoke(this.props, 'onRowDataChanged', event)
    }
    render() {
        const { frameworkComponents, onGridReady, onRowDataChanged, ...props } = this.props
        return (
            <AgGridReact
                frameworkComponents={lodash.assign({}, frameworkComponents, frameworks)}
                onGridReady={this.onGridReady}
                onRowDataChanged={this.onRowDataChanged}
                {...props} />
        )
    }
}