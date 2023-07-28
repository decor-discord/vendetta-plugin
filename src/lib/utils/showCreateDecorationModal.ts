import { findByProps } from '@vendetta/metro';
import CreateDecorationModal from '../../ui/modals/CreateDecorationModal';

const { pushModal } = findByProps('pushModal');

export default () =>
	pushModal({
		key: 'create-decoration',
		modal: {
			key: 'create-decoration',
			modal: CreateDecorationModal,
			animation: 'slide-up',
			shouldPersistUnderModals: false,
			closable: true
		}
	});
