import { findByProps, findByStoreName } from '@vendetta/metro';
import { ReactNative } from '@vendetta/metro/common';
import { after } from '@vendetta/patcher';
import { getUsers, users } from './lib/api';
import { CDN_URL } from './lib/constants';
import Settings from './ui/pages/Settings';
import { unsubscribeFromUserDecorationsStore } from './ui/stores/UserDecorationsStore';
import { storage } from '@vendetta/plugin';

const UserStore = findByStoreName('UserStore');
const ImageResolver = findByProps('getAvatarDecorationURL', 'default');
const AvatarDecorationUtils = findByProps('isAnimatedAvatarDecoration');

let patches = [];

export default {
	onLoad: async () => {
		patches.push(unsubscribeFromUserDecorationsStore);
		patches.push(
			after('getUser', UserStore, (_, ret) => {
				if (ret && !ret.avatarDecoration?.asset?.startsWith('decor_') && users?.has(ret.id)) ret.avatarDecoration = {
					asset: `decor_${users?.get(ret.id)}`,
					skuId: "0"
				};
			})
		);

		patches.push(
			after('getAvatarDecorationURL', ImageResolver, ([{ avatarDecoration, canAnimate }], _) => {
				if (avatarDecoration?.asset?.startsWith('decor')) {
					const parts = avatarDecoration.asset.split('_').slice(1);
					if (!canAnimate && parts[0] === 'a') parts.shift();
					return CDN_URL + `/${parts.join('_')}.png`;
				} else if (avatarDecoration?.asset?.startsWith('file://')) {
					return avatarDecoration.asset;
				}
			})
		);

		patches.push(
			after('isAnimatedAvatarDecoration', AvatarDecorationUtils, ([avatarDecoration], _) => {
				if (ReactNative.Platform.OS === 'ios' && avatarDecoration?.asset?.startsWith('file://')) return true;
			})
		);

		storage.developerMode ??= false;

		getUsers();
	},
	onUnload: () => {
		patches.forEach((unpatch) => unpatch());
	},
	settings: Settings
};
