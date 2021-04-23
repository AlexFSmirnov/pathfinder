import styled from 'styled-components';

export const MapContainer = styled.div`
    height: 100vh;
    width: 100%auto;
`;

interface GoogleMapsPoint {
    lat: number;
    lng: number;
    text?: string;
}

export const WaypointElement = styled.div<GoogleMapsPoint>`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 50%;

    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const WalkingRouteElement = styled.div<GoogleMapsPoint>`
    width: 3px;
    height: 3px;
    background-color: blue;
    border-radius: 50%;
`;

export const TransportRouteElement = styled.div<GoogleMapsPoint>`
    width: 3px;
    height: 3px;
    background-color: red;
    border-radius: 50%;
`;
