import { ColDef, ColGroupDef } from 'ag-grid-community';
import lodash from 'lodash';
import React from 'react';
import PageController from '../controller';
import { EnumGender, EnumLocaleLabel } from '../locales';
import { RowAction } from './action';
/**
 * 表格
 * @export
 * @class index
 * @extends {React.Component}
 */
export default class index extends React.Component {
  state = {}
  readonly columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: EnumLocaleLabel.Name, field: 'name',
    },
    {
      headerName: EnumLocaleLabel.Avatar, field: 'avatar',
      // 渲染图片
      cellRenderer: React.AgGridFrameworks.image,
      // 给 image 的 props
      cellRendererParams: { width: 45 }
    },
    {
      headerName: EnumLocaleLabel.Gender, field: 'gender',
      valueFormatter: data => React.$i18n.t(lodash.get(EnumGender, data.value))
    },
    {
      headerName: EnumLocaleLabel.Birthday, field: 'birthday',
      valueFormatter: data => React.DataFormat(data.value)
    },
    {
      headerName: EnumLocaleLabel.Age, field: 'birthday',
      valueFormatter: data => React.Dayjs().diff(data.value, 'years').toString()
    },
    {
      headerName: EnumLocaleLabel.Introduce, field: 'introduce',
    },
    {
      headerName: EnumLocaleLabel.CreateDate, field: 'createDate',
      valueFormatter: data => React.DataFormat(data.value)
    },
  ]
  render() {
    return (
      <React.Cts.PageGrid
        PageController={PageController}
        columnDefs={this.columnDefs}
        // rowHeight={50}
        frameworkComponents={{ RowAction }} />
    )
  }
}
