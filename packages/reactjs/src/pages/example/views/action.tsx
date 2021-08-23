import React from 'react';
import PageController from '../controller';
/**
 * Page 操作
 * @export
 * @class PageAction
 * @extends {React.Component}
 */
// @withRouter
// @BindAll()
// export default class PageAction extends React.Cts.PageAction {
//   get PageController() {
//     return PageController
//   }
// }
export default function PageAction() {
  return <React.Cts.PageAction
    PageController={PageController}
  // excludes={['Export', 'Import']}
  />
}
/**
 * 行 操作
 * @export
 * @class RowAction
 */
// @withRouter
// @BindAll()
// export class RowAction extends React.Cts.RowAction {
//   get PageController() {
//     return PageController
//   }
// }
export function RowAction(props) {
  return <React.Cts.PageGridRowAction {...props}
    PageController={PageController}
    // includes={['Info']}
  />
}
