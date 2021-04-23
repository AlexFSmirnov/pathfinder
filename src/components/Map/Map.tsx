import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GoogleMap from 'google-map-react';
import { State } from '../../redux/types';
import { getApiKey } from '../../redux/selectors';
import { MapContainer } from './style';

interface StateProps {
    apiKey: string | null;
}

const Map: React.FC<StateProps> = ({ apiKey }) => {
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

    return (
        <MapContainer>
            {apiKey ? (
                <GoogleMap {...googleMapProps}>
                </GoogleMap>
            ) : null}
        </MapContainer>
    );
};

export default connect<StateProps, {} ,{}, State>(
    createStructuredSelector({
        apiKey: getApiKey,
    }),
)(Map);
