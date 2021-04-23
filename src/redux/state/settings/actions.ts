import {
    ApiKeyChangedAction,
    ApiLoadedAction,
    AppStartedLoadingAction,
    AppFinishedLoadingAction,
    API_KEY_CHANGED,
    API_LOADED,
    APP_STARTED_LOADING,
    APP_FINISHED_LOADING,
} from './types';

export const setApiKey = (key: string): ApiKeyChangedAction => ({
    type: API_KEY_CHANGED,
    payload: { apiKey: key },
});

export const setApiLoaded = (): ApiLoadedAction => ({
    type: API_LOADED,
});

export const appStartLoading = (): AppStartedLoadingAction => ({
    type: APP_STARTED_LOADING,
});

export const appFinishLoading = (): AppFinishedLoadingAction => ({
    type: APP_FINISHED_LOADING,
});
