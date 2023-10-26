import { CardExplorerStyled } from "./CardExplorerStyled"

interface CardExplorerProps {
    children?: React.ReactNode
}

const CardExplorer: React.FC<CardExplorerProps> = ({ children }) => {
    return (
        <>
            <CardExplorerStyled>
                {children}
            </CardExplorerStyled>
        </>
    )
}

export default CardExplorer