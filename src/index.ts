import { findByProps, findByStoreName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

const UserStore = findByStoreName("UserStore");
const ImageResolver = findByProps("getAvatarDecorationURL", "default");

const BASE_URL = "https://decor.fieryflames.dev";

let users: Set<string>;

let patches = [];

export default {
    onLoad: async () => {
        patches.push(after("getUser", UserStore, (_, ret) => {
            if (ret && users?.has(ret.id)) ret.avatarDecoration = "a_decor"
        }));

        patches.push(after("getAvatarDecorationURL", ImageResolver, ([{ userId, avatarDecoration }], _) => {
            if (avatarDecoration === "a_decor") return BASE_URL + `/${userId}.png`
        }));

        users = new Set(await fetch(BASE_URL + "/users.json").then((c) => c.json()));
    },
    onUnload: () => {
        patches.forEach((unpatch) => unpatch());
    },
};
