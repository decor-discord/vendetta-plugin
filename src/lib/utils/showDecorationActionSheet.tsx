import { findByProps, findByStoreName } from '@vendetta/metro';
import { ReactNative, clipboard } from '@vendetta/metro/common';
import { showConfirmationAlert } from '@vendetta/ui/alerts';
import { getAssetIDByName } from '@vendetta/ui/assets';
import { useCurrentUserDecorationsStore } from '../stores/CurrentUserDecorationsStore';
import { Decoration } from '../api';
import decorationToString from './decorationToString';
import discordifyDecoration from './discordifyDecoration';
import { showToast } from '@vendetta/ui/toasts';

const ImageResolver = findByProps('getAvatarDecorationURL', 'default');
const { showSimpleActionSheet } = findByProps('showSimpleActionSheet');
const { hideActionSheet } = findByProps('openLazy', 'hideActionSheet');
const UserStore = findByStoreName('UserStore');

const { Image } = ReactNative;

export default (decoration: Decoration) =>
	showSimpleActionSheet({
		key: 'DecorationActionSheet',
		header: {
			title: decoration.alt ?? 'Decoration',
			icon: (
				<Image
					source={{ uri: ImageResolver.getAvatarDecorationURL({ avatarDecoration: discordifyDecoration(decoration) }) }}
					style={{ width: 24, height: 24, marginRight: 8 }}
				/>
			),
			onClose: () => hideActionSheet()
		},
		options: [
			{
				icon: getAssetIDByName('ic_message_copy'),
				label: 'Copy Decoration Hash',
				onPress: () => {
					clipboard.setString(decoration.hash);
					showToast('Copied Decoration Hash!', getAssetIDByName('toast_copy_message'));
				}
			},
			...(decoration.authorId === UserStore.getCurrentUser().id
				? [
						{
							icon: getAssetIDByName('ic_message_delete'),
							label: 'Delete',
							isDestructive: true,
							onPress: () =>
								showConfirmationAlert({
									title: 'Delete Decoration',
									content: `Are you sure you want to delete ${decoration.alt ?? 'this decoration'}?`,
									confirmText: 'Delete',
									cancelText: 'Cancel',
									confirmColor: 'red' as ButtonColors.RED,
									onConfirm: () =>
										ReactNative.unstable_batchedUpdates(() => useCurrentUserDecorationsStore.getState().delete(decoration))
								})
						}
				  ]
				: [])
		]
	});
