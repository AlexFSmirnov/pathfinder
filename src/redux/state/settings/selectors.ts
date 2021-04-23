import { createSelector } from 'reselect';
import { State } from '../types';
import { SettingsState } from './types';

export const getSettings = (state: State) => state.settings;

export const getApiKey = createSelector<State, SettingsState, string | null>(
    getSettings,
    settings => settings.apiKey,
);

export const isApiLoaded = createSelector<State, SettingsState, boolean>(
    getSettings,
    settings => settings.isApiLoaded,
);
