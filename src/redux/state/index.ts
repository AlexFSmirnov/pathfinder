import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { settingsReducer } from './settings/reducer';
import { waypointsReducer } from './waypoints/reducer';

const settingsPersistConfig = {
    key: 'settings',
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['getIsApiLoaded'],
};

export const rootReducer = combineReducers({
    settings: persistReducer(settingsPersistConfig, settingsReducer),
    waypoints: waypointsReducer,
});
