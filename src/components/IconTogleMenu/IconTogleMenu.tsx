import { IconTogleMenuStyled } from "./IconTogleMenuStyled";


interface IconTogleMenuProps {
    icon: string;
    title: string;
    children?: React.ReactNode;
}

const IconTogleMenu: React.FC<IconTogleMenuProps> = ({ icon, title }) => {
    return (
        <IconTogleMenuStyled className="iconTogleButton">
            <img style={{ height: '20px', width: '20px' }} src={icon} alt="logo"></img>
            <span style={{ marginLeft: '10px' }}>{title}</span>
        </IconTogleMenuStyled>
    )
}

export default IconTogleMenu