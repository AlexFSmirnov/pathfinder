import { AppBar as MaterialAppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu, Add, VpnKey } from '@material-ui/icons';

interface AppBarProps {
    onMenuButtonClick: () => void;
    onKeyButtonClick: () => void;
    onAddButtonClick: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ onMenuButtonClick, onKeyButtonClick, onAddButtonClick }) => (
    <MaterialAppBar color="default">
        <Toolbar>
            <IconButton edge="start" onClick={onMenuButtonClick}>
                <Menu />
            </IconButton>
            <Typography variant="h6">Pathfinder</Typography>

            <div style={{ flex: 1 }} />

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
