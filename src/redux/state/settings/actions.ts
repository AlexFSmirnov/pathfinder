import {
    ApiKeyChangedAction,
    API_KEY_CHANGED,
} from './types';

export const setApiKey = (key: string): ApiKeyChangedAction => ({
    type: API_KEY_CHANGED,
    payload: { apiKey: key },
});
