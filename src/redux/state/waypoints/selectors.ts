import { createSelector } from 'reselect';
import { State } from '../types';

export const getWaypointsState = (state: State) => state.waypoints;

export const getWaypoints = createSelector(
    getWaypointsState,
    waypointsState => waypointsState.waypoints,
);

export const getPairRoutes = createSelector(
    getWaypointsState,
    waypointsState => waypointsState.pairRoutes,
);

export const getOptimalPath = createSelector(
    getWaypointsState,
    waypointsState => waypointsState.optimalPath,
);
