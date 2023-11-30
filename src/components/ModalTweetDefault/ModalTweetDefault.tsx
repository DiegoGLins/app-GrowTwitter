
import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from '@mui/material';
import '../../App.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    heigth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 50,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
    gap: '15px',
    borderRadius: 4

};

export interface ModalTweetDefaultProps {
    children?: React.ReactNode;
    openModal: boolean;
    actionCancel: () => void;
}


const ModalTweetDefault: React.FC<ModalTweetDefaultProps> = ({ openModal, children, actionCancel }) => {


    return (
        <Modal
            onClose={actionCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={openModal}
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={actionCancel}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {children}
            </Box>
        </Modal>
    );
}

export default ModalTweetDefault


