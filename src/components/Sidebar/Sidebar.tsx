import { connect } from 'react-redux';
import { Drawer } from '@material-ui/core';

interface OwnProps {
    isVisible: boolean;
    onClose: () => void;
}

interface StateProps {

}

type SidebarProps = OwnProps & StateProps;

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {

    return (
        <Drawer anchor="left" open={isVisible} onClose={onClose}>
            test
        </Drawer>
    );
};

export default connect(
)(Sidebar);