import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { Map } from './components';
import { GlobalStyle } from './style';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />
            <Map />
        </ThemeProvider>
    );
};

export default App;
