import { CardExplorerStyled } from "./CardExplorerStyled"

interface CardExplorerProps {
    children?: React.ReactNode
}

export const CardExplorer: React.FC<CardExplorerProps> = ({ children }) => {
    return (
        <>
            <CardExplorerStyled>
                <h4><strong>O que está acontecendo ?</strong></h4>
                <h5 style={{ color: 'gray', paddingTop: '15px' }}>Esportes - Há 45 minutos</h5>
                <p><strong>Assunto sobre esportes</strong></p>
                <h5 style={{ color: 'gray', paddingTop: '15px' }}>Assunto do Momento em Brasil</h5>
                <p><strong>Assunto do Momento</strong></p>
                <h5 style={{ color: 'gray', paddingTop: '15px' }}>Música - Há 25 minutos</h5>
                <p><strong>Assunto sobre Música</strong></p>
                <h5 style={{ color: 'gray', paddingTop: '15px' }}>Filmes - Há 15 minutos</h5>
                <p><strong>Assunto sobre Filmes</strong></p>
                <h5 style={{ color: 'gray', paddingTop: '15px' }}>Notícias - Agora pouco</h5>
                <p><strong>Notícias de última hora</strong></p>
                {children}
            </CardExplorerStyled>
        </>
    )
}
