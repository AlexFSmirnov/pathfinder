import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from '@material-ui/core';
import { State } from '../../redux/types';
import { getApiKey } from '../../redux/selectors';
import { setApiKey } from '../../redux/actions';

interface OwnProps {
    isOpen: boolean;
    onClose: () => void;
}

interface StateProps {
    apiKey: string | null;
}

interface DispatchProps {
    setApiKey: (key: string) => void;
}

type ApiKeyDialogProps = OwnProps & StateProps & DispatchProps;

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ isOpen, onClose, apiKey, setApiKey }) => {
    const [enteredApiKey, setEnteredApiKey] = useState(apiKey || '');

    const handleApiKeyDialogConfirmed = () => {
        setApiKey(enteredApiKey);

        if (apiKey !== null && enteredApiKey !== apiKey) {
            setTimeout(() => window.location.reload(), 100);
        }

        onClose();
    };

    return (
        <Dialog fullWidth open={isOpen} onClose={onClose}>
            <DialogTitle>Enter API key</DialogTitle>
            <DialogContent>
                <TextField value={enteredApiKey} onChange={e => setEnteredApiKey(e.target.value)} placeholder="API Key" fullWidth />
            </DialogContent>
            <DialogActions>
                <Button color="primary" disabled={!enteredApiKey} onClick={handleApiKeyDialogConfirmed}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    createStructuredSelector({
        apiKey: getApiKey,
    }),
    {
        setApiKey,
    },
)(ApiKeyDialog);
