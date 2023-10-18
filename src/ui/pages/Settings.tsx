import { findByProps } from '@vendetta/metro';
import { React, ReactNative, url } from '@vendetta/metro/common';
import { storage } from '@vendetta/plugin';
import { showConfirmationAlert } from '@vendetta/ui/alerts';
import { getAssetIDByName } from '@vendetta/ui/assets';
import { Forms, HelpMessage as _HelpMessage } from '@vendetta/ui/components';
import showAuthorizationModal from '../../lib/utils/showAuthorizationModal';
import DecorationPicker from '../components/DecorationPicker';
import Icon from '../components/Icon';
import { useAuthorizationStore } from '../../lib/stores/AuthorizationStore';

const { Messages } = findByProps('Messages');

const { triggerHapticFeedback, HapticFeedbackTypes } = findByProps('triggerHapticFeedback');

const { ScrollView, View } = ReactNative;
const { FormSection, FormRow, FormArrow, FormSwitchRow, FormCTAButton, FormDivider, FormInput } = Forms;
const HelpMessage = _HelpMessage as any;
const { KeyboardAwareScrollView } = findByProps('KeyboardAwareScrollView');

export default function Settings() {
	const { isAuthorized } = useAuthorizationStore()

	return (
		<KeyboardAwareScrollView>
			{!isAuthorized() && (
				<View style={{ padding: 8 }}>
					<HelpMessage messageType={0}>You need to Authorize with Decor before you can get custom decorations.</HelpMessage>
				</View>
			)}

			<DecorationPicker />

			{!isAuthorized() && (
				<FormSection>
					<FormRow
						label="Authorize with Decor"
						leading={<Icon source={getAssetIDByName('ic_link_24px')} />}
						trailing={FormArrow}
						onPress={showAuthorizationModal}
					/>
				</FormSection>
			)}

			{isAuthorized() && (
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
			<View style={{ height: 40 }} />
		</KeyboardAwareScrollView>
	);
}
