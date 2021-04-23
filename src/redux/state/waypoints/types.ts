export interface Waypoint {
    name: string;
    lat: number;
    lng: number;
    start: boolean;
    finish: boolean;
}

export enum TravelType {
    Walking = 'Walking',
    PublicTransport = 'PublicTransport',
}

export interface PairRoute {
    travelDuration: number;
    travelType: TravelType;
    pathCoords: Array<{ lat: number; lng: number }>;
}

export type PairRoutes = Record<string, Record<string, PairRoute>>;

export interface WaypointsState {
    waypoints: Record<string, Waypoint>;
    pairRoutes: PairRoutes;
    optimalPath: string[];
}

export const WAYPOINT_ADDED = 'WAYPOINT_ADDED';
export const WAYPOINT_REMOVED = 'WAYPOINT_REMOVED';
export const PAIR_ROUTES_UPDATED = 'PAIR_ROUTES_UPDATED';
export const OPTIMAL_PATH_UPDATED = 'OPTIMAL_PATH_UPDATED';
export const WAYPOINTS_CLEARED = 'WAYPOINTS_CLEARED';

export interface WaypointAddedAction {
    type: typeof WAYPOINT_ADDED;
    payload: {
        id: string;
        waypoint: Waypoint;
    };
}

export interface WaypointRemovedAction {
    type: typeof WAYPOINT_REMOVED;
    payload: {
        id: string;
    };
}

export interface PairRoutesUpdatedAction {
    type: typeof PAIR_ROUTES_UPDATED;
    payload: {
        pairRoutes: PairRoutes;
    };
}

export interface OptimalPathUpdatedAction {
    type: typeof OPTIMAL_PATH_UPDATED;
    payload: {
        optimalPath: string[]
    };
}

export interface WaypointsClearedAction {
    type: typeof WAYPOINTS_CLEARED;
}

export type WaypointsAction = WaypointAddedAction | WaypointRemovedAction | PairRoutesUpdatedAction | OptimalPathUpdatedAction | WaypointsClearedAction;
