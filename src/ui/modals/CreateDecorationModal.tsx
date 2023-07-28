import { findByProps } from '@vendetta/metro';
import CreateDecoration from '../pages/CreateDecoration';

const { default: Navigator, getRenderCloseButton } = findByProps('getRenderCloseButton');
const { popModal } = findByProps('pushModal');

export default () => (
	<Navigator
		initialRouteName="CREATE_DECORATION"
		screens={{
			CREATE_DECORATION: {
				headerLeft: getRenderCloseButton(() => popModal('create-decoration')),
				render: CreateDecoration,
				title: 'Create Decoration'
			}
		}}
	/>
);
