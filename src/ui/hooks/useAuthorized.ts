import { storage } from '@vendetta/plugin';
import { useProxy } from '@vendetta/storage';

export function useAuthorized() {
	useProxy(storage);

	return !!storage.token;
}
