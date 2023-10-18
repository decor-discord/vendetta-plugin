import { findByProps } from '@vendetta/metro';
import { Forms } from '@vendetta/ui/components';
import Card from './Card';
import Icon from './Icon';

const { FormIcon } = Forms;
const { TextStyleSheet, Text } = findByProps('TextStyleSheet');

export default function CardButton({ source, label, onPress, disabled, lookDisabled = false, selected = false }) {
	return (
		<Card onPress={onPress} disabled={disabled} lookDisabled={lookDisabled} selected={selected}>
			<Icon source={source} />
			<Text style={[TextStyleSheet['text-sm/medium']]}>{label}</Text>
		</Card>
	);
}
