import { SettingsState, SettingsAction, API_KEY_CHANGED, API_LOADED } from './types';

const settingsInitialState: SettingsState = {
    apiKey: null,
    isApiLoaded: false,
};

export const settingsReducer = (state = settingsInitialState, action: SettingsAction) => {
    switch (action.type) {
        case API_KEY_CHANGED:
            return { ...state, ...action.payload };

        case API_LOADED:
            return { ...state, isApiLoaded: true };

        default:
            return state;
    }
};
