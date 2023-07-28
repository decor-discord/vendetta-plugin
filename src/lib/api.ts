import { storage } from '@vendetta/plugin';
import { BASE_URL } from './constants';

export interface Preset {
	id: string;
	name: string;
	description: string | null;
	decorations: Decoration[];
}

export interface Decoration {
	hash: string;
	animated: boolean;
	alt: string | null;
	authorId: string | null;
	reviewed: boolean | null;
	presetId: string | null;
}

export interface NewDecoration {
	uri: string;
	fileName: string;
	fileType: string;
	alt: string | null;
}

export const API_URL = BASE_URL + '/api';

export let users: Map<string, string>;

export const isAuthorized = () => !!storage.token;

export const cFetch = (url: RequestInfo, options?: RequestInit) =>
	fetch(url, { ...options, headers: { ...options?.headers, Authorization: `Bearer ${storage.token}` } }).then((c) =>
		c.ok ? c : Promise.reject(c)
	);

export const getUsers = async (cache: RequestCache = 'default') =>
	(users = new Map(Object.entries(await fetch(API_URL + '/users', { cache }).then((c) => c.json()))));

export const getUserDecorations = async (id: string = '@me'): Promise<Decoration[]> =>
	cFetch(API_URL + `/users/${id}/decorations`).then((c) => c.json());

export const getUserDecoration = async (id: string = '@me'): Promise<Decoration | null> =>
	cFetch(API_URL + `/users/${id}/decoration`).then((c) => c.json());

export const setUserDecoration = async (decoration: Decoration | NewDecoration | null, id: string = '@me'): Promise<string | Decoration> => {
	const formData = new FormData();

	if (decoration && Object.hasOwn(decoration, 'hash')) {
		decoration = decoration as Decoration;
		formData.append('hash', decoration.hash);
	} else if (!decoration) {
		formData.append('hash', null);
	} else if (decoration && Object.hasOwn(decoration, 'uri')) {
		decoration = decoration as NewDecoration;
		//@ts-expect-error
		formData.append('image', { uri: decoration.uri, type: decoration.fileType, name: decoration.fileName });
		formData.append('alt', decoration.alt);
	}

	return cFetch(API_URL + `/users/${id}/decoration`, { method: 'PUT', body: formData }).then((c) =>
		decoration && Object.hasOwn(decoration, 'uri') ? c.json() : c.text()
	);
};

export const getDecoration = async (hash: string): Promise<Decoration> => fetch(API_URL + `/decorations/${hash}`).then((c) => c.json());

export const deleteDecoration = async (hash: string): Promise<void> => {
	await cFetch(API_URL + `/decorations/${hash}`, { method: 'DELETE' });
};

export const getPresets = async (): Promise<Preset[]> => fetch(API_URL + '/decorations/presets').then((c) => c.json());
