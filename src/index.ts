import { findByProps, findByStoreName } from "@vendetta/metro";
import { after, before } from "@vendetta/patcher";

const UserStore = findByStoreName("UserStore");
const ImageResolver = findByProps("getAvatarDecorationURL", "default");

const BASE_URL = "https://decor.fieryflames.dev";

let users: Map<string, string>;

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

        users = new Map(Object.entries(await fetch(BASE_URL + "/users.json").then((c) => c.json())));
    },
    onUnload: () => {
        patches.forEach((unpatch) => unpatch());
    },
};
