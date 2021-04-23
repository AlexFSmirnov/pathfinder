export interface SettingsState {
    apiKey: string | null;
}

export const API_KEY_CHANGED = 'API_KEY_CHANGED';

export interface ApiKeyChangedAction {
    type: typeof API_KEY_CHANGED;
    payload: {
        apiKey: string;
    };
}

export type SettingsAction = ApiKeyChangedAction;
