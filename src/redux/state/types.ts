import { SettingsAction, SettingsState } from './settings/types';

export interface State {
    settings: SettingsState;
}

export type Action = SettingsAction;
