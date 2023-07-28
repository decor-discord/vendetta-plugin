import { findByName, findByProps, findByStoreName } from '@vendetta/metro';
import { FluxDispatcher, lodash } from '@vendetta/metro/common';
import { Decoration, NewDecoration, deleteDecoration, getUserDecoration, getUserDecorations, setUserDecoration } from '../../lib/api';
import decorationToString from '../../lib/utils/decorationToString';

const create = findByName('create') as typeof import('zustand').default;
const { subscribeWithSelector } = findByProps('subscribeWithSelector') as typeof import('zustand/middleware');

const UserStore = findByStoreName('UserStore');

interface UserDecorationsState {
	decorations: Decoration[];
	selectedDecoration: Decoration | null;
	fetched: boolean;
	fetch: () => Promise<void>;
	delete: (decoration: Decoration | string) => Promise<void>;
	create: (decoration: NewDecoration) => Promise<void>;
	select: (decoration: Decoration | null) => Promise<void>;
	clear: () => void;
}

export const useUserDecorationsStore = create(
	subscribeWithSelector<UserDecorationsState>((set, get) => ({
		decorations: [],
		selectedDecoration: null,
		fetched: false,
		fetch: async () => set({ decorations: await getUserDecorations(), selectedDecoration: await getUserDecoration(), fetched: true }),
		create: async (newDecoration: NewDecoration) => {
			const decoration = (await setUserDecoration(newDecoration)) as Decoration;
			set({ decorations: [...get().decorations, decoration] });
		},
		delete: async (decoration: Decoration | string) => {
			const hash = typeof decoration === 'object' ? decoration.hash : decoration;
			await deleteDecoration(hash);

			const { selectedDecoration, decorations } = get();
			let newState: Record<string, any> = { decorations: decorations.filter((d) => d.hash !== hash) };
			if (selectedDecoration?.hash === hash) newState.selectedDecoration = null;

			set(newState);
		},
		select: async (decoration: Decoration | null) => {
			set({ selectedDecoration: decoration });
		},
		clear: () => set({ decorations: [], selectedDecoration: null, fetched: false })
	}))
);

export const unsubscribeFromUserDecorationsStore = useUserDecorationsStore.subscribe(
	(state) => [state.selectedDecoration, state.fetched],
	lodash.debounce(([decoration, fetched], [prevDecoration, prevFetched]) => {
		if (fetched !== prevFetched || decoration?.hash === prevDecoration?.hash) return;

		setUserDecoration(decoration);

		const user = UserStore.getCurrentUser();
		user.avatarDecoration = decoration ? decorationToString(decoration) : null;
		FluxDispatcher.dispatch({ type: 'USER_UPDATE', user });
	}, 1000)
);
