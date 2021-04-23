import { AppThunkAction } from '../types';
import { getIsApiLoaded } from '../settings/selectors';
import {
    WaypointAddedAction,
    WaypointRemovedAction,
    PairRoutesUpdatedAction,
    OptimalPathUpdatedAction,
    WaypointsClearedAction,
    WAYPOINT_ADDED,
    WAYPOINT_REMOVED,
    PAIR_ROUTES_UPDATED,
    OPTIMAL_PATH_UPDATED,
    WAYPOINTS_CLEARED,
    Waypoint,
    PairRoutes,
    PairRoute,
    TravelType,
} from './types';
import { getPairRoutes, getWaypoints } from './selectors';

export const addWaypoint = (id: string, waypoint: Waypoint): WaypointAddedAction => ({
    type: WAYPOINT_ADDED,
    payload: { id, waypoint },
});

export const removeWaypoint = (id: string): WaypointRemovedAction => ({
    type: WAYPOINT_REMOVED,
    payload: { id },
});

export const updatePairRoutes = (pairRoutes: PairRoutes): PairRoutesUpdatedAction => ({
    type: PAIR_ROUTES_UPDATED,
    payload: { pairRoutes },
});

export const updateOptimalPath = (optimalPath: string[]): OptimalPathUpdatedAction => ({
    type: OPTIMAL_PATH_UPDATED,
    payload: { optimalPath },
});

export const clearWaypoints = (): WaypointsClearedAction => ({
    type: WAYPOINTS_CLEARED,
});

export const setPairRouteIfSmaller = (id1: string, id2: string, route: PairRoute): AppThunkAction => (dispatch, getState) => {
    const pairRoutes = getPairRoutes(getState());

    if (!pairRoutes[id1] || !pairRoutes[id1][id2] || route.travelDuration < pairRoutes[id1][id2].travelDuration) {
        dispatch(updatePairRoutes({
            ...pairRoutes,
            [id1]: {
                ...(pairRoutes[id1] || {}),
                [id2]: route,
            },
        }));
    }
};

export const computePairRoute = (id1: string, w1: Waypoint, id2: string, w2: Waypoint): AppThunkAction => dispatch => {
    const directionService = new google.maps.DirectionsService();

    directionService.route({
        origin: { lat: w1.lat, lng: w1.lng },
        destination: { lat: w2.lat, lng: w2.lng },
        travelMode: google.maps.TravelMode.WALKING,
    }, response => {
        if (response && response.routes && response.routes[0]) {
            const route = response.routes[0];

            const distance = route.legs[0].distance?.value || 100000000;
            const duration = route.legs[0].duration?.value || 100000000;

            if (distance < 2500) {
                dispatch(setPairRouteIfSmaller(id1, id2, {
                    travelDuration: duration,
                    travelType: TravelType.Walking,
                    pathCoords: route.overview_path.map(({ lat, lng }) => ({ lat: lat(), lng: lng() })),
                }));
            }

            else {
                directionService.route({
                    origin: { lat: w1.lat, lng: w1.lng },
                    destination: { lat: w2.lat, lng: w2.lng },
                    travelMode: google.maps.TravelMode.TRANSIT,
                }, transitResponse => {
                    if (transitResponse && transitResponse.routes && transitResponse.routes[0]) {
                        const transitRoute = transitResponse.routes[0];

                        const transitDuration = transitRoute.legs[0].duration?.value || 100000000;

                        dispatch(setPairRouteIfSmaller(id1, id2, {
                            travelDuration: transitDuration,
                            travelType: TravelType.PublicTransport,
                            pathCoords: transitRoute.overview_path.map(({ lat, lng }) => ({ lat: lat(), lng: lng() })),
                        }));
                    }
                });
            }
        }
    });
};

export const addWaypointAndUpdatePairRoutes = (id: string, waypoint: Waypoint): AppThunkAction => (dispatch, getState) => {
    const state = getState();

    const isApiLoaded = getIsApiLoaded(state);

    if (!isApiLoaded) {
        setTimeout(() => {
            dispatch(addWaypointAndUpdatePairRoutes(id, waypoint));
        }, 300);
        return;
    }

    const waypoints = getWaypoints(state);

    dispatch(addWaypoint(id, waypoint));

    Object.keys(waypoints).forEach(id2 => {
        dispatch(computePairRoute(id, waypoint, id2, waypoints[id2]));
        dispatch(computePairRoute(id2, waypoints[id2], id, waypoint));
    });
};
