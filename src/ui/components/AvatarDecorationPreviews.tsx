import { findByName, findByProps, findByStoreName } from '@vendetta/metro';
import { stylesheet } from '@vendetta/metro/common';
import { semanticColors } from '@vendetta/ui';
import { General } from '@vendetta/ui/components';

const { View } = General;
const HeaderAvatar = findByName('HeaderAvatar');
const { AvatarColumn } = findByProps('AvatarColumn');

const UserStore = findByStoreName('UserStore');

const styles = stylesheet.createThemedStyleSheet({
	headerAvatarContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: semanticColors.BACKGROUND_FLOATING,
		width: 208,
		height: 208,
		borderRadius: 4
	},
	container: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingTop: 16
	}
});

export default function AvatarDecorationPreviews({ pendingAvatarDecoration }) {
	return (
		<View style={styles.container}>
			<View style={styles.headerAvatarContainer}>
				<HeaderAvatar
					user={UserStore.getCurrentUser()}
					pendingAvatarDecoration={pendingAvatarDecoration}
					size="editAvatarDecoration"
					decorationStyle={{ margin: -12 }}
				/>
			</View>
			<AvatarColumn pendingAvatarDecoration={pendingAvatarDecoration} />
		</View>
	);
}
