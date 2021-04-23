import { combineReducers } from 'redux';
import { settingsReducer } from './settings/reducer';

export const rootReducer = combineReducers({
    settings: settingsReducer,
});
