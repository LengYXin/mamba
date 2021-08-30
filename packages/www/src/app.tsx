import {
    BasicLayoutProps
} from '@ant-design/pro-layout';
import { history } from 'umi';
import { IConfigFromPlugins } from './.umi/core/pluginConfig';
import lodash from 'lodash';
// export const layout = ({ routes, initialState, ...props }: IConfigFromPlugins): BasicLayoutProps => {
//     console.log("LENG ~ layout ~ lodash.head(routes)?.routes", props, lodash.head(routes)?.routes)
//     return {
//         // rightContentRender: () => <RightContent />,
//         // footerRender: () => <Footer />,
//         onPageChange: () => {
//             // const { currentUser } = initialState;
//             console.log("LENG ~ layout ~ initialState", initialState)
//             const { location } = history;
//             console.log("LENG ~ layout ~ location", location)
//             // // 如果没有登录，重定向到 login
//             // if (!currentUser && location.pathname !== '/user/login') {
//             //     history.push('/user/login');
//             // }
//         },
//         route: lodash.head(routes)?.routes,
//         menuHeaderRender: undefined,
//         ...initialState?.settings,
//     };
// };
// export function layout(props: any): BasicLayoutProps {
//     console.log("LENG ~ layout ~ props", props)
//     return {

//     }
// }
export function patchRoutes(props: any) {
    console.log("LENG ~ patchRoutes ~ routes", props)
}