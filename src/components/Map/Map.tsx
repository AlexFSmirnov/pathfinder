import GoogleMap from 'google-map-react';
import { MapContainer } from './style';

export interface MapProps {

}

const Map: React.FC<MapProps> = ({}) => {
    const googleMapProps = {
        bootstrapURLKeys: {
            key: 'AIzaSyDMXZE8ukqhhkdFraaFQshIiVTAywpYWns',
        },
        defaultCenter: {
            lat: 59.95,
            lng: 30.33,
        },
        defaultZoom: 11,
    };

    return (
        <MapContainer>
            <GoogleMap {...googleMapProps}>

            </GoogleMap>
        </MapContainer>
    );
};

export default Map;
