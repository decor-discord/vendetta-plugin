import { findByName, findByProps } from '@vendetta/metro';
import { CLIENT_ID, AUTHORIZE_URL } from '../constants';
import { useAuthorizationStore } from '../stores/AuthorizationStore';

const { pushModal, popModal } = findByProps('pushModal');
const OAuth2AuthorizeModal = findByName('OAuth2AuthorizeModal');

export default () =>
	pushModal({
		key: 'oauth2-authorize',
		modal: {
			key: 'oauth2-authorize',
			modal: OAuth2AuthorizeModal,
			animation: 'slide-up',
			shouldPersistUnderModals: false,
			props: {
				clientId: CLIENT_ID,
				redirectUri: AUTHORIZE_URL,
				scopes: ['identify'],
				responseType: 'code',
				permissions: 0n,
				cancelCompletesFlow: false,
				callback: async ({ location }) => {
					const url = new URL(location);
					url.searchParams.append('client', 'vendetta');

					const req = await fetch(url);

					if (req?.ok) {
						useAuthorizationStore.getState().setToken(await req.text());
					} else {
						popModal('oauth2-authorize');
					}
				},
				dismissOAuthModal: () => popModal('oauth2-authorize')
			},
			closable: true
		}
	});
