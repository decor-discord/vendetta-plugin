import { NavigationNative, React, ReactNative } from '@vendetta/metro/common';
import { getAssetIDByName } from '@vendetta/ui/assets';
import { Forms } from '@vendetta/ui/components';
import decorationToString from '../../lib/utils/decorationToString';
import showCreateDecorationModal from '../../lib/utils/showCreateDecorationModal';
import showDecorationActionSheet from '../../lib/utils/showDecorationActionSheet';
import { useCurrentUserDecorationsStore } from '../../lib/stores/CurrentUserDecorationsStore';
import AvatarDecorationPreviews from './AvatarDecorationPreviews';
import CardButton from './CardButton';
import DecorationCard from './DecorationCard';
import Icon from './Icon';
import Presets from '../pages/Presets';
import { useAuthorizationStore } from '../../lib/stores/AuthorizationStore';
import discordifyDecoration from '../../lib/utils/discordifyDecoration';
import { showToast } from '@vendetta/ui/toasts';

const { FlatList, View, ActivityIndicator } = ReactNative;
const { FormTitle } = Forms;

export default function DecorationPicker() {
	const [loading, setLoading] = React.useState<boolean | null>(false);
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
			fetchUserDecorations()
				.then(() => setLoading(false))
				.catch((c) => setLoading(null));
			setLoading(true);
		} else {
			clearUserDecorations();
			setLoading(false);
		}
	}, [isAuthorized]);

	const navigation = NavigationNative.useNavigation();

	const hasPendingDecoration = decorations.some((decoration) => decoration.reviewed === false);

	return (
		<>
			<AvatarDecorationPreviews pendingAvatarDecoration={selectedDecoration ? discordifyDecoration(selectedDecoration) : null} />
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
							onPress={!hasPendingDecoration ? showCreateDecorationModal : () => showToast('You already have a decoration pending review!', getAssetIDByName('img_none'))}
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
