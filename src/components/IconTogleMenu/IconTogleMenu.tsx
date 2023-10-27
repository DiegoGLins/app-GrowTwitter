
interface IconTogleMenuProps {
    icon: string;
    title: string;
    children?: React.ReactNode;
}

const IconTogleMenu: React.FC<IconTogleMenuProps> = ({ icon, title }) => {

    return (
        <>
            <img style={{ height: '20px', width: '20px' }} src={icon} alt="logo"></img>
            <span style={{ marginLeft: '10px' }}>{title}</span>
        </>
    )
}

export default IconTogleMenu