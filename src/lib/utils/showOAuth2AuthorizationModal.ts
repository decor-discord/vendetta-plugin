import { findByName, findByProps } from '@vendetta/metro';
import { storage } from '@vendetta/plugin';
import { API_URL } from '../api';
import { CLIENT_ID } from '../constants';

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
				redirectUri: API_URL + '/authorize',
				scopes: ['identify'],
				responseType: 'code',
				permissions: 0n,
				cancelCompletesFlow: false,
				callback: async ({ location }) => {
					const url = new URL(location);
					url.searchParams.append('client', 'vendetta');

					const req = await fetch(url);

					if (req?.ok) {
						storage.token = await req.text();
					} else {
						popModal('oauth2-authorize');
					}
				},
				dismissOAuthModal: () => popModal('oauth2-authorize')
			},
			closable: true
		}
	});
