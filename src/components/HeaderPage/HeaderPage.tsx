import { HeaderPageStyled } from "./HeaderPageStyled"

interface HeaderPageProps {
    title?: React.ReactNode
}

const HeaderPage: React.FC<HeaderPageProps> = ({ title }) => {
    return (
        <>
            <HeaderPageStyled>
                <strong>{title}</strong>
            </HeaderPageStyled>
        </>
    )
}

export default HeaderPage