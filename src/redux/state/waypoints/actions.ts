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
import { appFinishLoading, appStartLoading } from '../settings/actions';

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

export const updatePairRoutesWithVerify = (pairRoutes: PairRoutes): AppThunkAction => (dispatch, getState) => {
    const state = getState();
    const waypoints = getWaypoints(state);

    dispatch(updatePairRoutes(pairRoutes));

    let allPresent = true;
    Object.keys(waypoints).forEach(id1 => {
        Object.keys(waypoints).forEach(id2 => {
            if (id1 !== id2 && (!pairRoutes[id1] || !pairRoutes[id1][id2])) {
                allPresent = false;
            }
        });
    });

    if (allPresent) {
        dispatch(appFinishLoading());
    }
};

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
        dispatch(updatePairRoutesWithVerify({
            ...pairRoutes,
            [id1]: {
                ...(pairRoutes[id1] || {}),
                [id2]: route,
            },
        }));
    }
};

export const computePairRoute = (id1: string, w1: Waypoint, id2: string, w2: Waypoint, timeout: number): AppThunkAction => dispatch => {
    const directionService = new google.maps.DirectionsService();

    directionService.route({
        origin: { lat: w1.lat, lng: w1.lng },
        destination: { lat: w2.lat, lng: w2.lng },
        travelMode: google.maps.TravelMode.WALKING,
    }, (response, status) => {
        if (status !== 'OK') {
            setTimeout(() => dispatch(computePairRoute(id1, w1, id2, w2, timeout + 1000)), timeout);
        }

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
                setTimeout(() => {
                    directionService.route({
                        origin: { lat: w1.lat, lng: w1.lng },
                        destination: { lat: w2.lat, lng: w2.lng },
                        travelMode: google.maps.TravelMode.TRANSIT,
                    }, (transitResponse, transitStatus) => {
                        if (transitStatus !== 'OK') {
                            setTimeout(() => dispatch(computePairRoute(id1, w1, id2, w2, timeout + 1000)), timeout);
                        }

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
                }, 1000);
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

    if (Object.keys(waypoint).length > 0) {
        dispatch(appStartLoading());
    }
    Object.keys(waypoints).forEach((id2, index) => {
        setTimeout(() => dispatch(computePairRoute(id, waypoint, id2, waypoints[id2], 100)), 1000 * index);
        setTimeout(() => dispatch(computePairRoute(id2, waypoints[id2], id, waypoint, 100)), 1000 * (Object.keys(waypoints).length + index));
    });
};

interface OptimalPathRecursionProps {
    pairRoutes: PairRoutes;
    waypoints: Record<string, Waypoint>;
    usedWaypoints: string[];
}

const optimalPathRecursion = ({ pairRoutes, waypoints, usedWaypoints }: OptimalPathRecursionProps) => {
    if (usedWaypoints.length === Object.keys(waypoints).length) {
        let duration = 0;
        for (let i = 1; i < usedWaypoints.length; ++i) {
            duration += pairRoutes[usedWaypoints[i - 1]][usedWaypoints[i]].travelDuration;
        }

        return { duration, path: usedWaypoints };
    }

    let bestDuration = Infinity;
    let bestPath: string[] = [];
    Object.entries(waypoints).forEach(([id, waypoint]) => {
        if (usedWaypoints.includes(id)) {
            return;
        }

        if (waypoint.finish && !(usedWaypoints.length === Object.keys(waypoints).length - 1)) {
            return;
        }

        const { duration, path } = optimalPathRecursion({
            pairRoutes,
            waypoints,
            usedWaypoints: [...usedWaypoints, id],
        });

        if (duration < bestDuration) {
            bestDuration = duration;
            bestPath = path;
        }
    });

    return { 
        duration: bestDuration,
        path: bestPath,
    };
};

export const findOptimalPath = (): AppThunkAction => (dispatch, getState) => {
    const state = getState();
    const waypoints = getWaypoints(state);
    const pairRoutes = getPairRoutes(state);

    let startWaypoint = Object.keys(waypoints)[0];
    Object.entries(waypoints).forEach(([id, waypoint]) => {
        if (waypoint.start) {
            startWaypoint = id;
        }
    });

    const { path } = optimalPathRecursion({
        pairRoutes,
        waypoints,
        usedWaypoints: [startWaypoint],
    });

    dispatch(updateOptimalPath(path));
};
