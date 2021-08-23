import { GridOptions } from "ag-grid-community";
import i18n from "i18next";
import lodash from "lodash";
import React from "react";
import "./frameworks";


export default () => {
    const defaultOptions: GridOptions = {
        // loadingOverlayComponent: React.AgGridFrameworks.loadingOverlayComponent,
        noRowsOverlayComponent: React.AgGridFrameworks.noRowsOverlayComponent,
        suppressLoadingOverlay: true,
        rowSelection: 'multiple',
        // enableRangeSelection: true,
        // enableRangeHandle: true,
        // enableFillHandle: true,
        // debug:true,
        defaultColDef: {
            sortable: true,
            resizable: true,
            headerValueGetter: (params) => i18n.t(lodash.get(params, 'colDef.headerName', '')),
            // minWidth: 100
        },
        sideBar: React.AppConfig.userAgent.isMobile ? {} : {
            toolPanels: [
                {
                    id: "columns",
                    labelDefault: "Columns",
                    labelKey: "columns",
                    iconKey: "columns",
                    toolPanel: "agColumnsToolPanel",
                    toolPanelParams: {
                        // suppressRowGroups: true,
                        suppressValues: true,
                        suppressPivots: true,
                        suppressPivotMode: true,
                        // suppressSideButtons: true,
                        // suppressColumnFilter: true,
                        // suppressColumnSelectAll: true,
                        // suppressColumnExpandAll: true
                    },
                },
                {
                    id: "filters",
                    labelDefault: "Filters",
                    labelKey: "filters",
                    iconKey: "filter",
                    toolPanel: "agFiltersToolPanel",
                },
            ],
        }
    }
    return defaultOptions
}
