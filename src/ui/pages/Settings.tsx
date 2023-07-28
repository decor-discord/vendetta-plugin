import { findByProps } from '@vendetta/metro';
import { React, ReactNative, url } from '@vendetta/metro/common';
import { storage } from '@vendetta/plugin';
import { showConfirmationAlert } from '@vendetta/ui/alerts';
import { getAssetIDByName } from '@vendetta/ui/assets';
import { Forms, HelpMessage as _HelpMessage } from '@vendetta/ui/components';
import { DISCORD_SERVER_INVITE } from '../../lib/constants';
import showOAuth2AuthorizationModal from '../../lib/utils/showOAuth2AuthorizationModal';
import DecorationPicker from '../components/DecorationPicker';
import { useAuthorized } from '../hooks/useAuthorized';
import { useProxy } from '@vendetta/storage';
import Icon from '../components/Icon';

const { Messages } = findByProps('Messages');

const { triggerHapticFeedback, HapticFeedbackTypes } = findByProps('triggerHapticFeedback');

const { ScrollView, View } = ReactNative;
const { FormSection, FormRow, FormArrow, FormSwitchRow, FormCTAButton, FormDivider, FormInput } = Forms;
const HelpMessage = _HelpMessage as any;
const { KeyboardAwareScrollView } = findByProps('KeyboardAwareScrollView');

export default function Settings() {
	useProxy(storage);
	const authorized = useAuthorized();

	return (
		<KeyboardAwareScrollView>
			{!authorized && (
				<View style={{ padding: 8 }}>
					<HelpMessage messageType={0}>You need to Authorize with Decor before you can get custom decorations.</HelpMessage>
				</View>
			)}

			<DecorationPicker />

			{!authorized && (
				<FormSection>
					<FormRow
						label="Authorize with Decor"
						leading={<Icon source={getAssetIDByName('ic_link_24px')} />}
						trailing={FormArrow}
						onPress={showOAuth2AuthorizationModal}
					/>
				</FormSection>
			)}

			<FormSection>
				<FormRow
					label="Discord Server"
					leading={<Icon source={getAssetIDByName('Discord')} />}
					trailing={FormRow.Arrow}
					onPress={() => url.openDeeplink(DISCORD_SERVER_INVITE)}
					onLongPress={() => {
						triggerHapticFeedback(HapticFeedbackTypes.IMPACT_LIGHT);
						storage.developerMode = !storage.developerMode;
					}}
				/>
			</FormSection>

			{authorized && (
				<FormCTAButton
					color="danger"
					label={Messages.LOGOUT}
					onPress={() =>
						showConfirmationAlert({
							title: Messages.LOGOUT,
							content: Messages.USER_SETTINGS_CONFIRM_LOGOUT,
							confirmText: Messages.LOGOUT,
							confirmColor: 'red' as ButtonColors.RED,
							cancelText: Messages.CANCEL,
							onConfirm: () => (storage.token = undefined)
						})
					}
				/>
			)}

			{storage.developerMode && (
				<FormSection title="Developer Settings">
					<FormSwitchRow
						label="Use Custom Constants"
						subLabel="Override constants with custom values."
						leading={<Icon source={getAssetIDByName('ic_link_24px')} />}
						value={storage.useCustomConstants}
						onValueChange={(value) => (storage.useCustomConstants = value)}
					/>

					{[
						{
							title: 'Client ID',
							placeholder: '012345678910',
							key: 'clientId'
						},
						{
							title: 'Base URL',
							placeholder: 'http://example.com',
							key: 'baseUrl'
						},
						{
							title: 'CDN URL',
							placeholder: 'http://example.com',
							key: 'cdnUrl'
						}
					].map(({ title, placeholder, key }) => (
						<>
							<FormDivider />
							<FormInput
								title={title}
								placeholder={placeholder}
								value={storage[key]}
								onChange={(v) => (storage[key] = v)}
								disabled={!storage.useCustomConstants}
							/>
						</>
					))}
				</FormSection>
			)}
			<View style={{ height: 40 }} />
		</KeyboardAwareScrollView>
	);
}
