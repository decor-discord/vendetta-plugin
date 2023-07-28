import { findByProps } from '@vendetta/metro';
import { ReactNative, stylesheet } from '@vendetta/metro/common';
import { semanticColors } from '@vendetta/ui';

const { View, TouchableOpacity } = ReactNative;

const { triggerHapticFeedback, HapticFeedbackTypes } = findByProps('triggerHapticFeedback');

const styles = stylesheet.createThemedStyleSheet({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: semanticColors.BACKGROUND_FLOATING,
		width: 72,
		height: 72,
		borderRadius: 4
	},
	inner: {
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	selected: {
		borderWidth: 2,
		borderColor: semanticColors.BUTTON_OUTLINE_BRAND_BORDER_ACTIVE
	},
	disabled: {
		opacity: 0.5
	}
});

const hapticFeedbackWrapper = (fn) => {
	triggerHapticFeedback(HapticFeedbackTypes.IMPACT_LIGHT);
	fn();
};

export default function Card({
	onPress = undefined,
	onLongPress = undefined,
	disabled = undefined,
	lookDisabled = undefined,
	selected = false,
	children
}) {
	return (
		<TouchableOpacity
			onPress={onPress ? () => hapticFeedbackWrapper(onPress) : undefined}
			onLongPress={onLongPress ? () => hapticFeedbackWrapper(onLongPress) : undefined}
			disabled={disabled}
		>
			<View style={[styles.container, selected ? styles.selected : null]}>
				<View style={[styles.inner, (disabled || lookDisabled) && styles.disabled]}>{children}</View>
			</View>
		</TouchableOpacity>
	);
}
