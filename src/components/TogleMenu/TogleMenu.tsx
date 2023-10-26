import { TogleMenuStyled } from "./TogleMenuStyled";

interface TogleMenuProps {
    children?: React.ReactNode;
}

const TogleMenu: React.FC<TogleMenuProps> = ({ children }) => {
    return (
        <TogleMenuStyled>
            {children}
        </TogleMenuStyled>
    )
}

export default TogleMenu