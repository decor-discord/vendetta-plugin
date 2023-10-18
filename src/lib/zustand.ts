import { findByName } from '@vendetta/metro';

export const create = findByName('create') as typeof import('zustand').default;
