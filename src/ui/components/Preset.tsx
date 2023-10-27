import { Forms } from '@vendetta/ui/components';
import { Preset } from '../../lib/api';
import { findByName, findByProps, findByStoreName } from '@vendetta/metro';
import { NavigationNative, ReactNative, stylesheet } from '@vendetta/metro/common';
import DecorationCard from './DecorationCard';
import { useCurrentUserDecorationsStore } from '../../lib/stores/CurrentUserDecorationsStore';
import { semanticColors } from '@vendetta/ui';
import { getAssetIDByName } from '@vendetta/ui/assets';

const { FormTitle } = Forms;
const { View, FlatList, Image } = ReactNative;
const { TextStyleSheet, Text } = findByProps('TextStyleSheet');
const { default: SummarizedIconRow, OverflowCircle } = findByName('SummarizedIconRow', false);
const { type: Avatar } = findByProps('AvatarSizes').default;

const styles = stylesheet.createThemedStyleSheet({
	wrapper: {
		borderWidth: 2,
		borderRadius: 20,
		borderColor: semanticColors.BACKGROUND_SECONDARY,
		backgroundColor: semanticColors.BACKGROUND_SECONDARY
	}
});

const UserUtils = findByProps('getUser', 'fetchCurrentUser');
const UserStore = findByStoreName('UserStore');

const defaultAvatars = [
	getAssetIDByName('default_avatar_0'),
	getAssetIDByName('default_avatar_1'),
	getAssetIDByName('default_avatar_2'),
	getAssetIDByName('default_avatar_3'),
	getAssetIDByName('default_avatar_4'),
	getAssetIDByName('default_avatar_5')
];

// Make this return default avatars for null users
function renderAvatar({ user, id }) {
	if (user) return <Avatar user={user} size="size16" />;
	else {
		const defaultAvatarIndex = Number((BigInt(id) >> 22n) % 6n);
		console.log(id, defaultAvatarIndex);
		return (
			<Image
				source={defaultAvatars[defaultAvatarIndex]}
				style={{
					width: 16,
					height: 16,
					borderRadius: 8
				}}
			/>
		);
	}
}

export default function Preset({ preset }: { preset: Preset }) {
	const select = useCurrentUserDecorationsStore((state) => state.select);
	const navigation = NavigationNative.useNavigation();

	return (
		<View>
			<View>
				<FormTitle
					title={preset.name}
					icon={
						<SummarizedIconRow
							iconWrapperStyle={styles.wrapper}
							items={preset.authorIds.map((id) => {
								const user = UserStore.getUser(id);

								// Hopefully next time the user will be fetched
								if (!user) UserUtils.getUser(id);

								return { user, id };
							})}
							max={5}
							offsetAmount={-8}
							overflowComponent={OverflowCircle}
							overflowStyle={styles.wrapper}
							style={{
								height: 16
							}}
							renderItem={renderAvatar}
						/>
					}
				/>
				{preset.description && (
					<Text style={[TextStyleSheet['text-sm/medium'], { paddingHorizontal: 16, paddingBottom: 8 }]}>{preset.description}</Text>
				)}
			</View>

			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={preset.decorations}
				renderItem={({ item }) => (
					<DecorationCard
						decoration={item}
						onPress={() => {
							select(item);
							navigation.pop();
						}}
					/>
				)}
				ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
				snapToInterval={74}
				decelerationRate="fast"
				contentContainerStyle={{ paddingHorizontal: 8 }}
			/>
		</View>
	);
}
