import { Context } from "@nuxt/types";
import lodash from "lodash";
import * as Mamba from '@mamba/clients';
export default async function (context: Context) {
    try {
        Mamba.Log.success(context.route.name, context.route, context)
    } catch (error) {
    }
}
