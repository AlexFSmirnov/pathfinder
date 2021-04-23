import { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, List, ListItem, Typography } from '@material-ui/core';
import { clearWaypoints } from '../../redux/actions';
import { getPairRoutes, getOptimalPath, getWaypoints } from '../../redux/selectors';
import { PairRoutes, Waypoint, State, TravelType } from '../../redux/types';
import { createStructuredSelector } from 'reselect';

interface OwnProps {
    isVisible: boolean;
    onClose: () => void;
}

interface StateProps {
    waypoints: Record<string, Waypoint>;
    pairRoutes: PairRoutes;
    optimalPath: string[];
}

interface DispatchProps {
    clearWaypoints: () => void;
}

type SidebarProps = OwnProps & StateProps & DispatchProps;

const formatSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
};

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose, waypoints, pairRoutes, optimalPath, clearWaypoints }) => {
    const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

    const handleClear = () => {
        clearWaypoints();
        setIsClearDialogOpen(false);
    };

    let waypointList: JSX.Element[] = [];
    if (optimalPath.length > 1) {
        waypointList.push(
            <ListItem key={optimalPath[0]}>
                <Typography variant="body1" color="primary">{waypoints[optimalPath[0]].name} (Start)</Typography>
            </ListItem>
        );

        for (let i = 1; i < optimalPath.length; ++i) {
            const route = pairRoutes[optimalPath[i - 1]][optimalPath[i]];

            waypointList.push(
                <>
                    <Divider key={`${optimalPath[i]}-1`} />
                    <ListItem key={`${optimalPath[i]}-2`}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Typography variant="body2">{formatSeconds(route.travelDuration)}</Typography>
                            <Typography variant="body2">{route.travelType === TravelType.Walking ? 'Walking' : 'Public Transport'}</Typography>
                        </div>
                    </ListItem>
                    <Divider key={`${optimalPath[i]}-3`} />
                    <ListItem key={`${optimalPath[i]}-4`}>
                        <Typography variant="body1" color="primary">{waypoints[optimalPath[i]].name}{waypoints[optimalPath[i]].finish ? ' (Finish)' : ''}</Typography>
                    </ListItem>
                </>
            );
        }
    }

    return (
        <>
            <Drawer anchor="left" open={isVisible} onClose={onClose}>
                <div style={{ width: '80vw', height: '0px' }} />
                {optimalPath.length > 1 ? (
                    <>
                        <List>
                            <ListItem>
                                <Typography variant="h6">Path</Typography>
                            </ListItem>
                            <Divider />
                        </List>

                        {waypointList}

                        <Divider />
                    </>
                ) : null}

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

export default connect<StateProps, DispatchProps, OwnProps, State>(
    createStructuredSelector({
        waypoints: getWaypoints,
        pairRoutes: getPairRoutes,
        optimalPath: getOptimalPath,
    }),
    {
        clearWaypoints,
    }
)(Sidebar);