
import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogActions, DialogContent, DialogContentText, Modal, TextField } from '@mui/material';
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
    message?: string;
    openModal: boolean;
    actionCancel: () => void;
    actionConfirm: () => void
}


const ModalTweetDefault: React.FC<ModalTweetDefaultProps> = ({ message, openModal, actionCancel, actionConfirm }) => {

    //logica para enviar tweets do usuario vai aqui pegando informações do usuario do ContentContext


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
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" >
                        <TextField fullWidth className='size-box-tweet' >{message}</TextField>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={actionConfirm}>
                        Tweetar
                    </Button>
                </DialogActions>
            </Box>
        </Modal>
    );
}

export default ModalTweetDefault


