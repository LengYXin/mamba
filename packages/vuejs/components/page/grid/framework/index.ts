
import noRowsOverlay from './noRowsOverlay.vue';
import loadingOverlay from './loadingOverlay.vue';
export default {
    noRowsOverlay,
    loadingOverlay
}
/**
 * 枚举
 */
export enum frameworkComponents {
    noRowsOverlay = 'noRowsOverlay',
    loadingOverlay = 'loadingOverlay',
}
// declare module '@vue/runtime-core' {
//     interface ComponentCustomProperties {
//         $FrameworkComponents: typeof frameworkComponents
//     }
// }