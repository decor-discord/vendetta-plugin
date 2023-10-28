/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
import { persist, type StateStorage } from "zustand/middleware";
import { findByName, findByStoreName } from "@vendetta/metro";
import { FluxDispatcher, ReactNative } from "@vendetta/metro/common";
import { id } from "@vendetta/plugin";
import { create } from "../zustand";
import subscribeToFluxDispatcher from "../utils/subscribeToFluxDispatcher";

const MMKVManager = ReactNative.NativeModules.MMKVManager as StateStorage;

const UserStore = findByStoreName('UserStore');

interface AuthorizationState {
    token: string | null;
    tokens: Record<string, string>;
    init: () => void;
    setToken: (token: string) => void;
    isAuthorized: () => boolean;
}

export const useAuthorizationStore = create<AuthorizationState>(
    persist(
        (set, get) => ({
            token: null,
            tokens: {},
            init: () => set({ token: get().tokens[UserStore.getCurrentUser().id] ?? null }),
            setToken: (token: string) => set({ token, tokens: { ...get().tokens, [UserStore.getCurrentUser().id]: token } }),
            isAuthorized: () => !!get().token,
        }),
        {
            name: 'decor-auth',
            getStorage: () => MMKVManager,
            partialize: state => ({ tokens: state.tokens }),
            onRehydrateStorage: () => state => state.init()
        }
    )
);

export const unsubscribe = subscribeToFluxDispatcher('CONNECTION_OPEN', () => useAuthorizationStore.getState().init())
