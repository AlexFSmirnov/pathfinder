import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Loader } from '@googlemaps/js-api-loader';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { State } from './redux/types';
import { getApiKey, getIsApiLoaded, getIsAppLoading } from './redux/selectors';
import { setApiLoaded, findOptimalPath } from './redux/actions';
import { GlobalStyle } from './style';
import { Map, AppBar, Sidebar, ApiKeyDialog, AddWaypointDialog } from './components';

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
    isLoading: boolean;
}

interface DispatchProps {
    setApiLoaded: () => void;
    findOptimalPath: () => void;
}

type AppProps = StateProps & DispatchProps;

const App: React.FC<AppProps> = ({ apiKey, isLoading, findOptimalPath, setApiLoaded }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
    const [isAddWaypointDialogVisible, setIsAddWaypointDialogVisible] = useState(false);

    useEffect(() => {
        if (apiKey) {
            const loader = new Loader({
                apiKey,
            });

            loader.load().then(setApiLoaded);
        }
    }, [apiKey, setApiLoaded]);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />

            <AppBar
                onMenuButtonClick={() => setIsSidebarVisible(true)}
                onKeyButtonClick={() => setIsApiKeyDialogOpen(true)}
                onAddButtonClick={() => setIsAddWaypointDialogVisible(true)}
                onSearchButtonClick={findOptimalPath}
                isLoading={isLoading}
            />
            <Sidebar isVisible={isSidebarVisible} onClose={() => setIsSidebarVisible(false)} />

            <Map />

            <ApiKeyDialog isOpen={isApiKeyDialogOpen} onClose={() => setIsApiKeyDialogOpen(false)} />
            <AddWaypointDialog isOpen={isAddWaypointDialogVisible} onClose={() => setIsAddWaypointDialogVisible(false)} />
        </ThemeProvider>
    );
};

export default connect<StateProps, DispatchProps, {}, State>(
    createStructuredSelector({
        apiKey: getApiKey,
        isApiLoaded: getIsApiLoaded,
        isLoading: getIsAppLoading,
    }),
    {
        setApiLoaded,
        findOptimalPath,
    }
)(App);
