import { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, List, ListItem, Typography } from '@material-ui/core';
import { clearWaypoints } from '../../redux/actions';

interface OwnProps {
    isVisible: boolean;
    onClose: () => void;
}

interface StateProps {

}

interface DispatchProps {
    clearWaypoints: () => void;
}

type SidebarProps = OwnProps & StateProps & DispatchProps;

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose, clearWaypoints }) => {
    const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

    const handleClear = () => {
        clearWaypoints();
        setIsClearDialogOpen(false);
    };

    return (
        <>
            <Drawer anchor="left" open={isVisible} onClose={onClose}>
                <div style={{ width: '80vw', height: '0px' }} />
                <List>
                    <ListItem>
                        <Typography variant="h6">Waypoints</Typography>
                    </ListItem>
                </List>

                <Divider />
                <Button onClick={() => setIsClearDialogOpen(true)}>Clear waypoints</Button>
            </Drawer>

            <Dialog open={isClearDialogOpen} onClose={() => setIsClearDialogOpen(false)}>
                <DialogTitle>
                    Confirm deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to clear all waypoints?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="default" onClick={() => setIsClearDialogOpen(false)}>Cancel</Button>
                    <Button color="secondary" onClick={handleClear}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default connect(
    null,
    {
        clearWaypoints,
    }
)(Sidebar);