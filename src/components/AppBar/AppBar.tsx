import { AppBar as MaterialAppBar, CircularProgress, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu, Add, VpnKey, Search } from '@material-ui/icons';

interface AppBarProps {
    isLoading?: boolean;
    onMenuButtonClick: () => void;
    onKeyButtonClick: () => void;
    onAddButtonClick: () => void;
    onSearchButtonClick: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ isLoading, onMenuButtonClick, onSearchButtonClick, onKeyButtonClick, onAddButtonClick }) => (
    <MaterialAppBar color="default">
        <Toolbar>
            <IconButton edge="start" onClick={onMenuButtonClick}>
                <Menu />
            </IconButton>
            <Typography variant="h6">Pathfinder</Typography>

            <div style={{ flex: 1 }} />

            {isLoading ? (
                <CircularProgress />
            ) : (
                <IconButton edge="end" onClick={onSearchButtonClick}>
                    <Search />
                </IconButton>
            )}
            <IconButton edge="end" onClick={onKeyButtonClick}>
                <VpnKey />
            </IconButton>
            <IconButton edge="end" onClick={onAddButtonClick}>
                <Add />
            </IconButton>
        </Toolbar>
    </MaterialAppBar>
);

export default AppBar;
