import {
    ApiKeyChangedAction,
    ApiLoadedAction,
    API_KEY_CHANGED,
    API_LOADED,
} from './types';

export const setApiKey = (key: string): ApiKeyChangedAction => ({
    type: API_KEY_CHANGED,
    payload: { apiKey: key },
});

export const setApiLoaded = (): ApiLoadedAction => ({
    type: API_LOADED,
});
