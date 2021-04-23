import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { State, Waypoint } from '../../redux/types';
import { addWaypointAndUpdatePairRoutes } from '../../redux/actions';

interface OwnProps {
    isOpen: boolean;
    onClose: () => void;
}

interface DispatchProps {
    addWaypointAndUpdatePairRoutes: (id: string, waypoint: Waypoint) => void;
}

type AddWaypointDialogProps = OwnProps & DispatchProps;

const AddWaypointDialog: React.FC<AddWaypointDialogProps> = ({ isOpen, onClose, addWaypointAndUpdatePairRoutes }) => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredCoords, setEnteredCoords] = useState('');
    const [isStart, setIsStart] = useState(false);
    const [isFinish, setIsFinish] = useState(false);

    useEffect(() => {
        setEnteredName('');
        setEnteredCoords('');
        setIsStart(false);
        setIsFinish(false);
    }, [isOpen]);

    const handleAddWaypointDialogConfirmed = () => {
        addWaypointAndUpdatePairRoutes(uuid(), {
            name: enteredName,
            lat: parseFloat(enteredCoords.split(',')[0]),
            lng: parseFloat(enteredCoords.split(',')[1]),
            start: isStart,
            finish: isFinish,
        });
        onClose();
    };

    return (
        <Dialog fullWidth open={isOpen} onClose={onClose}>
            <DialogTitle>New waypoint</DialogTitle>
            <DialogContent>
                <TextField value={enteredName} onChange={e => setEnteredName(e.target.value)} label="Name" fullWidth />
                <TextField value={enteredCoords} onChange={e => setEnteredCoords(e.target.value)} label="Coordinates" fullWidth />
                <FormControlLabel control={<Checkbox color="primary" checked={isStart} onChange={e => setIsStart(e.target.checked)} />} label="Start" />
                <FormControlLabel control={<Checkbox color="primary" checked={isFinish} onChange={e => setIsFinish(e.target.checked)} />} label="Finish" />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="primary" disabled={!(enteredName && enteredCoords)} onClick={handleAddWaypointDialogConfirmed}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default connect<{}, DispatchProps, OwnProps, State>(
    null,
    {
        addWaypointAndUpdatePairRoutes,
    },
)(AddWaypointDialog);
