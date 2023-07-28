import { storage } from '@vendetta/plugin';

const maybeCustom = (customValue: string, defaultValue: string) => (storage.useCustomConstants && customValue ? customValue : defaultValue);

export const CLIENT_ID = maybeCustom(storage.clientId, '1096966363416899624');
export const BASE_URL = maybeCustom(storage.baseUrl, 'https://decor.fieryflames.dev');
export const CDN_URL = maybeCustom(storage.cdnUrl, 'https://decorcdn.fieryflames.dev');
export const DISCORD_SERVER_INVITE = 'https://discord.gg/dXp2SdxDcP';
