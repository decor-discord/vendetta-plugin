import { findByProps, findByStoreName } from '@vendetta/metro';
import { ReactNative } from '@vendetta/metro/common';
import { after } from '@vendetta/patcher';
import { CDN_URL, RAW_SKU_ID, SKU_ID } from './lib/constants';
import Settings from './ui/pages/Settings';
import { unsubscribeFromCurrentUserDecorationsStore } from './lib/stores/CurrentUserDecorationsStore';
import { subscriptions, useUsersDecorationsStore } from './lib/stores/UsersDecorationsStore';
import { unsubscribe } from './lib/stores/AuthorizationStore';

const UserStore = findByStoreName('UserStore');
const ImageResolver = findByProps('getAvatarDecorationURL', 'default');
const AvatarDecorationUtils = findByProps('isAnimatedAvatarDecoration');

let patches = [];

export default {
	onLoad: async () => {
		patches.push(unsubscribeFromCurrentUserDecorationsStore);
		patches.push(unsubscribe);
		patches.push(...subscriptions);
		patches.push(
			after('getUser', UserStore, (_, user) => {
				const store = useUsersDecorationsStore.getState();

				if (user && store.has(user.id)) {
					const decoration = store.get(user.id);
		
					if (decoration && user.avatarDecoration?.skuId !== SKU_ID) {
						user.avatarDecoration = {
							asset: decoration,
							skuId: SKU_ID
						};
					} else if (!decoration && user.avatarDecoration && user.avatarDecoration?.skuId === SKU_ID) {
						user.avatarDecoration = null;
					}
		
					user.avatarDecorationData = user.avatarDecoration;
				}
			})
		);

		patches.push(
			after('getAvatarDecorationURL', ImageResolver, ([{ avatarDecoration, canAnimate }], _) => {
				if (avatarDecoration?.skuId === SKU_ID) {
					const parts = avatarDecoration.asset.split("_");
					if (!canAnimate && parts[0] === "a") parts.shift();
					return CDN_URL + `/${parts.join("_")}.png`;
				} else if (avatarDecoration?.skuId === RAW_SKU_ID) {
					return avatarDecoration.asset;
				}
			})
		);

		patches.push(
			after('isAnimatedAvatarDecoration', AvatarDecorationUtils, ([avatarDecoration], _) => {
				if (ReactNative.Platform.OS === 'ios' && avatarDecoration?.asset?.startsWith('file://')) return true;
			})
		);
	},
	onUnload: () => {
		patches.forEach((unpatch) => unpatch());
	},
	settings: Settings
};
