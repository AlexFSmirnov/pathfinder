export interface SettingsState {
    apiKey: string | null;
    getIsApiLoaded: boolean;
}

export const API_KEY_CHANGED = 'API_KEY_CHANGED';
export const API_LOADED = 'API_LOADED';

export interface ApiKeyChangedAction {
    type: typeof API_KEY_CHANGED;
    payload: {
        apiKey: string;
    };
}

export interface ApiLoadedAction {
    type: typeof API_LOADED;
}

export type SettingsAction = ApiKeyChangedAction | ApiLoadedAction;
