import lodash from "lodash";
import React from "react";
import Pagination from "./pagination";
const $Ctx = {
    /** 分页装饰器  */
    Pagination,
}
lodash.set(React, 'Ctx', $Ctx)
declare module 'react' {
    const Ctx: typeof $Ctx;
}
