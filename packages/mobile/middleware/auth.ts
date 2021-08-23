import { Context } from "@nuxt/types";
import "core-js/es";
import lodash from "lodash";
export default async function (context: Context) {
    try {
        console.log("LENG ~ context", context)
    } catch (error) {
    }
}
