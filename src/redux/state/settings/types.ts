export interface SettingsState {
    apiKey: string | null;
    getIsApiLoaded: boolean;
    isLoading: boolean;
}

export const API_KEY_CHANGED = 'API_KEY_CHANGED';
export const API_LOADED = 'API_LOADED';
export const APP_STARTED_LOADING = 'APP_STARTED_LOADING';
export const APP_FINISHED_LOADING = 'APP_FINISHED_LOADING';

export interface ApiKeyChangedAction {
    type: typeof API_KEY_CHANGED;
    payload: {
        apiKey: string;
    };
}

export interface ApiLoadedAction {
    type: typeof API_LOADED;
}

export interface AppStartedLoadingAction {
    type: typeof APP_STARTED_LOADING;
}

export interface AppFinishedLoadingAction {
    type: typeof APP_FINISHED_LOADING;
}

export type SettingsAction = ApiKeyChangedAction | ApiLoadedAction | AppStartedLoadingAction | AppFinishedLoadingAction;
