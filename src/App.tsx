import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    unstable_createMuiStrictModeTheme as createMuiTheme,
    ThemeProvider,
    CssBaseline,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    TextField,
    DialogActions,
    Button,
} from '@material-ui/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Map } from './components';
import { GlobalStyle } from './style';
import { State } from './redux/state/types';
import { getApiKey } from './redux/state/settings/selectors';
import { setApiKey } from './redux/state/settings/actions';
import { orange } from '@material-ui/core/colors';

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
}

interface DispatchProps {
    setApiKey: (key: string) => void;
}

type AppProps = StateProps & DispatchProps;

const App: React.FC<AppProps> = ({ apiKey, setApiKey }) => {
    const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(!apiKey);
    const [enteredApiKey, setEnteredApiKey] = useState('');
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


    // client.directions({
    //     params: {
    //         origin: [55.67122083532962, 37.55484212177921],
    //         destination: [55.663765996038485, 37.641359454608],
    //     },
    // }).then(r => {
    //     console.log(r);
    // });

    const handleApiKeyDialogConfirmed = () => {
        setApiKey(enteredApiKey);
        setIsApiKeyDialogOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />
            {/* <Map /> */}

            <Dialog fullWidth open={isApiKeyDialogOpen}>
                <DialogTitle>Enter API key</DialogTitle>
                <DialogContent>
                    <TextField value={enteredApiKey} onChange={e => setEnteredApiKey(e.target.value)} placeholder="API Key" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" disabled={!enteredApiKey} onClick={handleApiKeyDialogConfirmed}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

export default connect<StateProps, DispatchProps, {}, State>(
    createStructuredSelector({
        apiKey: getApiKey,
    }),
    {
        setApiKey,
    }
)(App);
