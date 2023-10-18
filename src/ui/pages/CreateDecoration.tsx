import { findByProps } from '@vendetta/metro';
import { React, ReactNative, stylesheet } from '@vendetta/metro/common';
import { getAssetIDByName } from '@vendetta/ui/assets';
import { Button, Forms } from '@vendetta/ui/components';
import type { Asset } from 'react-native-image-picker';
import readFileAsBase64 from '../../lib/utils/readFileAsBase64';
import AvatarDecorationPreviews from '../components/AvatarDecorationPreviews';
import { useCurrentUserDecorationsStore } from '../../lib/stores/CurrentUserDecorationsStore';
import Icon from '../components/Icon';
import { showToast } from '@vendetta/ui/toasts';
import { RAW_SKU_ID } from '../../lib/constants';
import { semanticColors } from '@vendetta/ui';

const { ScrollView, View } = ReactNative;
const { FormSection, FormRow, FormArrow, FormInput, FormDivider, FormHint } = Forms;

const { popModal } = findByProps('pushModal');
const { launchImageLibrary } = findByProps('launchImageLibrary') as typeof import('react-native-image-picker');

const { useSafeAreaInsets } = findByProps('useSafeAreaInsets');

const Parser = findByProps('parseTopic');

const styles = stylesheet.createThemedStyleSheet({
	errorHint: {
		paddingTop: 16,
		color: semanticColors.TEXT_DANGER
	}
})
export default function CreateDecoration() {
	const [asset, setAsset] = React.useState<Asset | null>(null);
	const [alt, setAlt] = React.useState('');
	const [creating, setCreating] = React.useState(false);

	const [error, setError] = React.useState<Error | null>(null);

	React.useEffect(() => {
        if (error) setError(null);
    }, [asset]);

	const insets = useSafeAreaInsets();
	const createDecoration = useCurrentUserDecorationsStore((state) => state.create);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View style={{ flex: 1 }}>
				<AvatarDecorationPreviews pendingAvatarDecoration={asset ? { asset: asset?.uri, skuId: RAW_SKU_ID } : null} />
				{error !== null && <FormHint style={styles.errorHint}>{error.message}</FormHint>}
				<FormSection>
					<FormRow
						label="Select Image"
						leading={<Icon source={getAssetIDByName('ic_image')} />}
						trailing={FormArrow}
						onPress={() => {
							launchImageLibrary(
								{
									mediaType: 'photo'
								},
								(ret) => {
									if (!ret || ret.didCancel) {
										setAsset(null);
										return;
									}
									const asset = ret.assets[0];
									if (asset) setAsset(asset);
								}
							);
						}}
					/>
					<FormHint>File should be APNG or PNG.</FormHint>
					<FormDivider />
					<FormInput value={alt} onChange={setAlt} placeholder="Companion Cube" title="Name" />
				</FormSection>
				<FormHint>{Parser.parse("Make sure your decoration does not violate [the guidelines](https://github.com/decor-discord/.github/blob/main/GUIDELINES.md) before creating your decoration.", true, { allowLinks: true })}</FormHint>
				{ReactNative.Platform.OS === 'android' && <FormHint>APNGs will not animate in the preview above on Android.</FormHint>}
			</View>
			<View style={{ justifyContent: 'flex-end', paddingHorizontal: 16, paddingBottom: insets.bottom }}>
				<Button
					text="Create"
					color={'brand'}
					size={'medium'}
					onPress={async () => {
						setCreating(true);
						try {
							// HACK: iOS strips animation when sending images with FormData
							let uri: string;
							if (ReactNative.Platform.OS === 'ios') {
								uri = 'data:' + asset.type + ';base64,' + (await readFileAsBase64(asset.uri));
							} else {
								uri = asset.uri;
							}

							await createDecoration({ uri, fileName: asset.fileName, fileType: asset.type, alt });

							popModal('create-decoration');
							showToast('Decoration created and pending review.', getAssetIDByName('Check'))
						} catch (e) {
							setError(e);
							setCreating(false);
						}
					}}
					loading={creating}
					disabled={(!asset || !alt || asset.type !== 'image/png' || !!error)}
				/>
			</View>
		</ScrollView>
	);
}
