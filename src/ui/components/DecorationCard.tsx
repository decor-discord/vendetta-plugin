import { findByName } from '@vendetta/metro';
import decorationToString from '../../lib/utils/decorationToString';
import Card from './Card';
import { useUserDecorationsStore } from '../stores/UserDecorationsStore';
import showDecorationActionSheet from '../../lib/utils/showDecorationActionSheet';

const CutoutableAvatarDecoration = findByName('CutoutableAvatarDecoration');

export default function DecorationCard({ decoration, onPress = undefined, selectable = undefined, disabled = undefined }) {
	const { selectedDecoration, select } = useUserDecorationsStore((state) => ({
		selectedDecoration: state.selectedDecoration,
		select: state.select
	}));

	selectable ??= decoration.reviewed === null || decoration.reviewed === true;
	onPress ??= () => select(decoration);

	return (
		<Card
			onPress={selectable ? onPress : undefined}
			onLongPress={() => showDecorationActionSheet(decoration)}
			selected={selectedDecoration?.hash === decoration.hash}
			disabled={disabled}
			lookDisabled={!selectable}
		>
			<CutoutableAvatarDecoration avatarDecoration={decorationToString(decoration)} size={56} animate={false} />
		</Card>
	);
}
