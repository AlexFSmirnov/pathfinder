import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Loader } from '@googlemaps/js-api-loader';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { State } from './redux/types';
import { getApiKey, isApiLoaded } from './redux/selectors';
import { setApiLoaded } from './redux/actions';
import { GlobalStyle } from './style';
import { Map, AppBar, Sidebar, ApiKeyDialog } from './components';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: orange['500'],
        },
    },
});

interface StateProps {
    apiKey: string | null;
    isApiLoaded: boolean;
}

interface DispatchProps {
    setApiLoaded: () => void;
}

type AppProps = StateProps & DispatchProps;

const App: React.FC<AppProps> = ({ apiKey, isApiLoaded, setApiLoaded }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
    const [isAddWaypointDialogVisible, setIsAddWaypointDialogVisible] = useState(false);

    useEffect(() => {
        if (apiKey) {
            const loader = new Loader({
                apiKey,
            });

            loader.load().then(setApiLoaded);
            // new google.maps.DirectionsService().route({
            //     origin: { lat: 55.67122083532962, lng: 37.55484212177921 },
            //     destination: { lat: 55.663765996038485, lng: 37.641359454608 },
            //     travelMode: google.maps.TravelMode.TRANSIT,
            //     // origin: [55.67122083532962, 37.55484212177921],
            //     // destination: [55.663765996038485, 37.641359454608],
            // }, r => console.log(r));
        }
    }, [apiKey, setApiLoaded]);


    // useEffect(() => {
    //     console.log('yes');
    //     const loader = new Loader({
    //         apiKey: 'AIzaSyDMXZE8ukqhhkdFraaFQshIiVTAywpYWns',
    //     });

    //     loader.load().then(() => {
    //         new google.maps.DirectionsService().route({
    //             origin: { lat: 55.67122083532962, lng: 37.55484212177921 },
    //             destination: { lat: 55.663765996038485, lng: 37.641359454608 },
    //             travelMode: google.maps.TravelMode.TRANSIT,
    //             // origin: [55.67122083532962, 37.55484212177921],
    //             // destination: [55.663765996038485, 37.641359454608],
    //         }, r => console.log(r));
    //     });
    // }, []);


    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />

            <AppBar
                onMenuButtonClick={() => setIsSidebarVisible(true)}
                onKeyButtonClick={() => setIsApiKeyDialogOpen(true)}
                onAddButtonClick={() => setIsAddWaypointDialogVisible(true)}
            />
            <Sidebar isVisible={isSidebarVisible} onClose={() => setIsSidebarVisible(false)} />

            <Map />

            <ApiKeyDialog isOpen={isApiKeyDialogOpen} onClose={() => setIsApiKeyDialogOpen(false)} />
        </ThemeProvider>
    );
};

export default connect<StateProps, DispatchProps, {}, State>(
    createStructuredSelector({
        apiKey: getApiKey,
        isApiLoaded: isApiLoaded,
    }),
    {
        setApiLoaded,
    }
)(App);
