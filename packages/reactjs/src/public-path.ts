declare global {
    interface Window {
        __MICRO_APP_ENVIRONMENT__?: boolean;
        __MICRO_APP_PUBLIC_PATH__?: string;
        __MICRO_APP_BASE_URL__?: string;
    }
}
if (window.__MICRO_APP_ENVIRONMENT__) {
    console.log("LENG ~ window", window)
    __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
export { }