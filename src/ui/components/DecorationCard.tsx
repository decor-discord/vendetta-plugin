import { findByName } from '@vendetta/metro';
import Card from './Card';
import { useCurrentUserDecorationsStore } from '../../lib/stores/CurrentUserDecorationsStore';
import showDecorationActionSheet from '../../lib/utils/showDecorationActionSheet';
import { showToast } from '@vendetta/ui/toasts';
import { getAssetIDByName } from '@vendetta/ui/assets';
import discordifyDecoration from '../../lib/utils/discordifyDecoration';

const CutoutableAvatarDecoration = findByName('CutoutableAvatarDecoration');

export default function DecorationCard({ decoration, onPress = undefined, selectable = undefined, disabled = undefined }) {
	const { selectedDecoration, select } = useCurrentUserDecorationsStore((state) => ({
		selectedDecoration: state.selectedDecoration,
		select: state.select
	}));

	selectable ??= decoration.reviewed === null || decoration.reviewed === true;
	onPress ??= selectable ? () => select(decoration) : () => showToast('This decoration has not been approved yet.', getAssetIDByName('img_none'));

	const selected = selectedDecoration?.hash === decoration.hash;

	return (
		<Card
			onPress={onPress}
			onLongPress={() => showDecorationActionSheet(decoration)}
			selected={selected}
			disabled={disabled}
			lookDisabled={!selectable}
		>
			<CutoutableAvatarDecoration avatarDecoration={discordifyDecoration(decoration)} size={56} animate={selected} />
		</Card>
	);
}
