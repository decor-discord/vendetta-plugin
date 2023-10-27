import { NavigationNative, React, ReactNative } from '@vendetta/metro/common';
import { getAssetIDByName } from '@vendetta/ui/assets';
import { Forms } from '@vendetta/ui/components';
import showCreateDecorationModal from '../../lib/utils/showCreateDecorationModal';
import { useCurrentUserDecorationsStore } from '../../lib/stores/CurrentUserDecorationsStore';
import AvatarDecorationPreviews from './AvatarDecorationPreviews';
import CardButton from './CardButton';
import DecorationCard from './DecorationCard';
import Icon from './Icon';
import Presets from '../pages/Presets';
import { useAuthorizationStore } from '../../lib/stores/AuthorizationStore';
import discordifyDecoration from '../../lib/utils/discordifyDecoration';
import { showToast } from '@vendetta/ui/toasts';
import { Preset as PresetInterface, getPresets } from '../../lib/api';
import { findByProps, findByStoreName } from '@vendetta/metro';

const { FlatList, View, ActivityIndicator, Pressable } = ReactNative;
const { FormTitle } = Forms;
const { TextStyleSheet, Text } = findByProps('TextStyleSheet');

const UserStore = findByStoreName('UserStore');
const Parser = findByProps('parse', 'parseToAST');
const { showUserProfile } = findByProps('showUserProfile');
const UserUtils = findByProps('getUser', 'fetchCurrentUser');

export default function DecorationPicker() {
	const [loading, setLoading] = React.useState<boolean | null>(false);
	const [presets, setPresets] = React.useState<PresetInterface[]>([]);
	const {
		decorations,
		selectedDecoration,
		fetch: fetchUserDecorations,
		clear: clearUserDecorations,
		select: selectDecoration
	} = useCurrentUserDecorationsStore();

	const { isAuthorized } = useAuthorizationStore();

	React.useEffect(() => {
		if (isAuthorized()) {
			getPresets()
				.then((presets) => setPresets(presets))
				.catch(() => void 0);
			fetchUserDecorations()
				.then(() => setLoading(false))
				.catch(() => setLoading(null));
			setLoading(true);
		} else {
			clearUserDecorations();
			setLoading(false);
		}
	}, [isAuthorized]);

	const navigation = NavigationNative.useNavigation();

	const hasPendingDecoration = decorations.some((decoration) => decoration.reviewed === false);

	const decorPreset = presets && selectedDecoration && presets.find((preset) => preset.id === selectedDecoration.presetId);

	return (
		<>
			<AvatarDecorationPreviews pendingAvatarDecoration={selectedDecoration ? discordifyDecoration(selectedDecoration) : null} />
			{selectedDecoration && (
				<View style={{ marginTop: 12, paddingHorizontal: 16, gap: 8 }}>
					<Text style={TextStyleSheet['text-lg/semibold']}>{selectedDecoration.alt}</Text>
					{decorPreset && <Text style={TextStyleSheet['eyebrow']}>Part of the {decorPreset.name} Preset</Text>}
					<Text style={TextStyleSheet['text-md/normal']}>
						Created by{' '}
						<Pressable
							onPress={() =>
								UserStore.getUser(selectedDecoration.authorId)
									? showUserProfile({ userId: selectedDecoration.authorId })
									: UserUtils.getUser(selectedDecoration.authorId).then(() =>
											showUserProfile({ userId: selectedDecoration.authorId })
									  )
							}
							pointerEvents="box-only"
							style={{ flexGrow: 0, flexShrink: 0 }}
						>
							{Parser.parse(`<@${selectedDecoration.authorId}>`, true)}
						</Pressable>
					</Text>
				</View>
			)}
			<FormTitle
				title="Decorations"
				icon={loading ? <ActivityIndicator /> : loading === null ? <Icon source={getAssetIDByName('ic_warning_24px')} /> : undefined}
			/>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={decorations}
				renderItem={({ item }) => <DecorationCard decoration={item} disabled={!isAuthorized() || loading === null} />}
				snapToInterval={74}
				decelerationRate="fast"
				ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
				ListHeaderComponent={() => (
					<CardButton
						source={getAssetIDByName('img_none')}
						label="None"
						onPress={() => {
							selectDecoration(null);
						}}
						disabled={!isAuthorized() || loading === null}
						selected={!selectedDecoration}
					/>
				)}
				ListHeaderComponentStyle={{ paddingRight: decorations.length === 0 ? 2 : 4 }}
				ListFooterComponent={() => (
					<View style={{ flexDirection: 'row' }}>
						<CardButton
							source={getAssetIDByName('smile')}
							label="Presets"
							onPress={() => {
								navigation.push('VendettaCustomPage', {
									title: 'Presets',
									render: Presets
								});
							}}
							selected={selectedDecoration && selectedDecoration.presetId !== null}
							disabled={!isAuthorized() || loading === null}
						/>
						<View style={{ width: 4 }} />
						<CardButton
							source={getAssetIDByName('ic_add_24px')}
							label="New.."
							onPress={
								!hasPendingDecoration
									? showCreateDecorationModal
									: () => showToast('You already have a decoration pending review!', getAssetIDByName('img_none'))
							}
							lookDisabled={hasPendingDecoration}
							disabled={!isAuthorized() || loading === null}
						/>
					</View>
				)}
				ListFooterComponentStyle={{ paddingLeft: decorations.length === 0 ? 2 : 4 }}
				contentContainerStyle={{ paddingHorizontal: 8 }}
			/>
		</>
	);
}
