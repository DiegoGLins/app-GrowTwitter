import { SideExplorerStyled } from "./SideExplorerStyled"


interface SideExplorerProps {
    children?: React.ReactNode
}

const SideEplorer: React.FC<SideExplorerProps> = ({ children }) => {
    return (
        <>
            <SideExplorerStyled>
                {children}
            </SideExplorerStyled>
        </>
    )
}

export default SideEplorer