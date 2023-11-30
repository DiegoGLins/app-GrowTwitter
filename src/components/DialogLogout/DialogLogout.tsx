import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';

interface DialogLogoutProps {
    open: boolean
    actionConfirm: () => void
    actionCancel: () => void
}


export default function DialogLogout(props: DialogLogoutProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                onClose={props.actionCancel}
                aria-labelledby="responsive-dialog-title"

            >
                <DialogTitle id="responsive-dialog-title">
                    {"Deseja realmente sair ?"}
                </DialogTitle>
                <DialogActions sx={{ gap: '3px', padding: '15px' }}>
                    <Button autoFocus variant='contained' color='primary' onClick={props.actionCancel}>
                        Cancelar
                    </Button>
                    <Button variant='contained' color='warning' onClick={props.actionConfirm} autoFocus>
                        Sair
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}