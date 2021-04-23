import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { Action, State } from './state/types';
import { rootReducer } from './state';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['settings'],
};

export const store = createStore(
    persistReducer<State, Action>(persistConfig, rootReducer as any),
    composeWithDevTools(),
);

export const persistor = persistStore(store as any);
