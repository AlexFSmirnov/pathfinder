import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { SettingsAction, SettingsState } from './settings/types';
import { WaypointsAction, WaypointsState } from './waypoints/types';

export interface State {
    settings: SettingsState;
    waypoints: WaypointsState;
}

export type Action = SettingsAction | WaypointsAction;

export type AppThunkAction<R = void> = ThunkAction<R, State, {}, Action>;
export type AppThunkDispatch = ThunkDispatch<State, {}, Action>;
