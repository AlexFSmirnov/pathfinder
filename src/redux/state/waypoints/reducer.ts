import {
    WaypointsState,
    WaypointsAction,
    WAYPOINT_ADDED,
    WAYPOINT_REMOVED,
    PAIR_ROUTES_UPDATED,
    OPTIMAL_PATH_UPDATED,
    WAYPOINTS_CLEARED,
} from './types';

export const waypointsInitialState: WaypointsState = {
    waypoints: {},
    pairRoutes: {},
    optimalPath: [],
};

export const waypointsReducer = (state = waypointsInitialState, action: WaypointsAction) => {
    switch (action.type) {
        case WAYPOINT_ADDED:
            return { ...state, waypoints: {
                ...state.waypoints,
                [action.payload.id]: action.payload.waypoint,
            } };

        case WAYPOINT_REMOVED:
            const updatedWaypoints = { ...state.waypoints };

            if (action.payload.id in Object.keys(updatedWaypoints)) {
                delete updatedWaypoints[action.payload.id];
            }

            return { ...state, waypoints: updatedWaypoints };

        case PAIR_ROUTES_UPDATED:
        case OPTIMAL_PATH_UPDATED:
            return { ...state, ...action.payload };

        case WAYPOINTS_CLEARED:
            return { ...waypointsInitialState };

        default:
            return state;
    };
};
