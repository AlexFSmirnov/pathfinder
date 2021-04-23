import { SettingsState, SettingsAction, API_KEY_CHANGED, API_LOADED, APP_STARTED_LOADING, APP_FINISHED_LOADING } from './types';

const settingsInitialState: SettingsState = {
    apiKey: null,
    getIsApiLoaded: false,
    isLoading: false,
};

export const settingsReducer = (state = settingsInitialState, action: SettingsAction) => {
    switch (action.type) {
        case API_KEY_CHANGED:
            return { ...state, ...action.payload };

        case API_LOADED:
            return { ...state, getIsApiLoaded: true };

        case APP_STARTED_LOADING:
            return { ...state, isLoading: true };

        case APP_FINISHED_LOADING:
            return { ...state, isLoading: false };

        default:
            return state;
    }
};
