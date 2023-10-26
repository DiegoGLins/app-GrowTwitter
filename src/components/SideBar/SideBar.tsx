
import { SideBarStyled } from "./SideBarStyled"

interface SideBarProps {
    children: React.ReactNode
}

const Sidebar: React.FC<SideBarProps> = ({ children }) => {
    return (
        <>
            <SideBarStyled>
                {children}
            </SideBarStyled>
        </>
    )
}

export default Sidebar