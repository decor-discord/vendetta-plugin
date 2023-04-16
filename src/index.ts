import { findByProps, findByStoreName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { BASE_URL } from "./lib/constants";
import { fetchUsers, users } from "./lib/users";
import Settings from "./ui/pages/Settings";
import { storage } from "@vendetta/plugin";

const UserStore = findByStoreName("UserStore");
const ImageResolver = findByProps("getAvatarDecorationURL", "default");

let patches = [];

export default {
    onLoad: async () => {
        patches.push(after("getUser", UserStore, (_, ret) => {
            if (ret && users?.has(ret.id)) ret.avatarDecoration = `decor_${users?.get(ret.id)}`
        }));

        patches.push(after("getAvatarDecorationURL", ImageResolver, ([{ avatarDecoration }], _) => {
            if (avatarDecoration?.startsWith("decor")) {
                const parts = avatarDecoration.split("_");
                parts.shift();
                return BASE_URL + `/${parts.join("_")}.png`
            };
        }));

        storage.debug ??= false;

        await fetchUsers();
    },
    onUnload: () => {
        patches.forEach((unpatch) => unpatch());
    },
    settings: Settings
};
