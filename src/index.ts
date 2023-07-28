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
const { CollectiblesExperiment } = findByProps('useCollectiblesExperiment');
const AvatarDecorationUtils = findByProps('isAnimatedAvatarDecoration');

let patches = [];

export default {
	onLoad: async () => {
		patches.push(unsubscribeFromUserDecorationsStore);
		patches.push(
			after('getUser', UserStore, (_, ret) => {
				if (ret && !ret.avatarDecoration?.startsWith('decor_') && users?.has(ret.id)) ret.avatarDecoration = `decor_${users?.get(ret.id)}`;
			})
		);

		patches.push(
			after('getAvatarDecorationURL', ImageResolver, ([{ avatarDecoration, canAnimate }], _) => {
				if (avatarDecoration?.startsWith('decor')) {
					const parts = avatarDecoration.split('_').slice(1);
					if (!canAnimate && parts[0] === 'a') parts.shift();
					return CDN_URL + `/${parts.join('_')}.png`;
				} else if (avatarDecoration?.startsWith('file://')) {
					return avatarDecoration;
				}
			})
		);

		patches.push(
			after('isAnimatedAvatarDecoration', AvatarDecorationUtils, ([avatarDecoration], _) => {
				if (ReactNative.Platform.OS === 'ios' && avatarDecoration?.startsWith('file://')) return true;
			})
		);

		patches.push(
			(() => {
				const oldVal = CollectiblesExperiment.getCurrentConfig().canUseAvatarDecorations;
				CollectiblesExperiment.getCurrentConfig().canUseAvatarDecorations = true;
				return () => (CollectiblesExperiment.getCurrentConfig().canUseAvatarDecorations = oldVal);
			})()
		);

		storage.developerMode ??= false;

		getUsers();
	},
	onUnload: () => {
		patches.forEach((unpatch) => unpatch());
	},
	settings: Settings
};
