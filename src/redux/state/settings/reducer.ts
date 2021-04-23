import { SettingsState, SettingsAction, API_KEY_CHANGED } from './types';

const settingsInitialState: SettingsState = {
    apiKey: null,
};

export const settingsReducer = (state = settingsInitialState, action: SettingsAction) => {
    switch (action.type) {
        case API_KEY_CHANGED:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};
