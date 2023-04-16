import { BASE_URL } from "./constants";

export let users: Map<string, string>;

export const fetchUsers = async (cache: RequestCache = "default") => users = new Map(Object.entries(await fetch(BASE_URL + "/users.json", { cache }).then(c => c.json())));

