
import { Grid } from '@mui/material';

interface AlertLoginProps {
    children: React.ReactNode
}

export default function AlertLoginStyled(props: AlertLoginProps) {
    return (
        <Grid className='styleAlertLogin' container>
            {props.children}
        </Grid>
    );
}