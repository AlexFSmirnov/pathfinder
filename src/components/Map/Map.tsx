import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GoogleMap from 'google-map-react';
import { v4 as uuidv4 } from 'uuid';
import { State, Waypoint, PairRoutes, TravelType } from '../../redux/types';
import { getApiKey, getWaypoints, getPairRoutes, getOptimalPath } from '../../redux/selectors';
import { MapContainer, WalkingRouteElement, TransportRouteElement, WaypointElement } from './style';

interface StateProps {
    apiKey: string | null;
    waypoints: Record<string, Waypoint>;
    pairRoutes: PairRoutes;
    optimalPath: string[];
}

const Map: React.FC<StateProps> = ({ apiKey, waypoints, pairRoutes, optimalPath }) => {
    const googleMapProps = {
        bootstrapURLKeys: {
            key: apiKey as string,
        },
        defaultCenter: {
            lat: 55.75209773472255,
            lng: 37.6174710947241,
        },
        defaultZoom: 12,
    };

    let allPathCoords: any[] = [];
    Object.values(pairRoutes).forEach(pairRoute => {
        Object.values(pairRoute).forEach(x => {
            allPathCoords = [...allPathCoords, ...x.pathCoords];
        });
    });

    let optimalPathCoords: Array<{ type: TravelType, lat: number, lng: number }> = [];
    if (optimalPath.length > 1) {
        for (let i = 1; i < optimalPath.length; ++i) {
            const route = pairRoutes[optimalPath[i - 1]][optimalPath[i]];
            route.pathCoords.forEach(coords => {
                optimalPathCoords.push({ type: route.travelType, lat: coords.lat, lng: coords.lng });
            });
        }
    }

    return (
        <MapContainer>
            {apiKey ? (
                <GoogleMap {...googleMapProps}>
                    {optimalPathCoords.map(({ type, lat, lng }) => (
                        type === TravelType.Walking ? (
                            <WalkingRouteElement key={uuidv4()} lat={lat} lng={lng} />
                        ) : (
                            <TransportRouteElement key={uuidv4()} lat={lat} lng={lng} />
                        )
                    ))}
                    {Object.entries(waypoints).map(([id, waypoint]) => (
                        <WaypointElement key={id} lat={waypoint.lat} lng={waypoint.lng} text={waypoint.name}>
                            {waypoint.name}
                        </WaypointElement>
                    ))}
                </GoogleMap>
            ) : null}
        </MapContainer>
    );
};

export default connect<StateProps, {} ,{}, State>(
    createStructuredSelector({
        apiKey: getApiKey,
        waypoints: getWaypoints,
        pairRoutes: getPairRoutes,
        optimalPath: getOptimalPath,
    }),
)(Map);
