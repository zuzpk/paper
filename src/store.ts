import { dynamicObject, TreeNode } from "@zuzjs/ui";
import { APP_VERSION } from "./config";

export const AppStore = {
    App : {
        version: APP_VERSION,
        debug: true,
        token: null,
        theme: `system`
    },
    User : {
        loading: true,
        ID: null
    },
    Docs: {
        loading: true,
        current: null,
        modules: {} as dynamicObject,
        roots: [] as string[],
        list: [] as TreeNode[]
    }
}