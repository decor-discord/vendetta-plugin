import { findByProps } from '@vendetta/metro';
import { React, ReactNative } from '@vendetta/metro/common';
import { getAssetIDByName } from '@vendetta/ui/assets';
import { Button, Forms } from '@vendetta/ui/components';
import type { Asset } from 'react-native-image-picker';
import readFileAsBase64 from '../../lib/utils/readFileAsBase64';
import AvatarDecorationPreviews from '../components/AvatarDecorationPreviews';
import { useUserDecorationsStore } from '../stores/UserDecorationsStore';
import Icon from '../components/Icon';
import { NewDecoration } from '../../lib/api';

const { ScrollView, View } = ReactNative;
const { FormSection, FormRow, FormArrow, FormInput, FormDivider, FormHint } = Forms;

const { popModal } = findByProps('pushModal');
const { launchImageLibrary } = findByProps('launchImageLibrary') as typeof import('react-native-image-picker');

const { useSafeAreaInsets } = findByProps('useSafeAreaInsets');

export default function CreateDecoration() {
	const [asset, setAsset] = React.useState<Asset | null>(null);
	const [alt, setAlt] = React.useState('');

	const insets = useSafeAreaInsets();
	const createDecoration = useUserDecorationsStore((state) => state.create);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View style={{ flex: 1 }}>
				<AvatarDecorationPreviews decorationData={asset?.uri} />
				<FormSection>
					<FormRow
						label="Select Image"
						leading={<Icon source={getAssetIDByName('ic_image')} />}
						trailing={FormArrow}
						onPress={() => {
							launchImageLibrary(
								{
									mediaType: 'photo',
									maxWidth: 768,
									maxHeight: 768
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
					<FormDivider />
					<FormInput value={alt} onChange={setAlt} placeholder="Apeture Science Logo" title="Name / Alt Text" />
				</FormSection>
				<FormHint>Avatar decorations are 1.2 times the size of a avatar.</FormHint>
				<FormHint>Your decoration will be reviewed before you can use it. If approved, it will be set as your selected decoration.</FormHint>
				{ReactNative.Platform.OS !== 'ios' && <FormHint>Animated PNGs will not animate in the preview above on your platform.</FormHint>}
			</View>
			<View style={{ justifyContent: 'flex-end', paddingHorizontal: 16, paddingBottom: insets.bottom }}>
				<Button
					text="Create Decoration"
					color={'brand'}
					size={'medium'}
					onPress={async () => {
						if (!asset) return;
						// HACK: iOS strips animation when sending images with FormData
						let uri: string;
						if (ReactNative.Platform.OS === 'ios') {
							uri = 'data:' + asset.type + ';base64,' + (await readFileAsBase64(asset.uri));
						} else {
							uri = asset.uri;
						}

						await createDecoration({ uri, fileName: asset.fileName, fileType: asset.type, alt });

						popModal('create-decoration');
					}}
					disabled={!asset || !alt}
				/>
			</View>
		</ScrollView>
	);
}
