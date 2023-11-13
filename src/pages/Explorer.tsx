import CardExplorer from "../components/CardExplorer"
import Sidebar from "../components/SideBar"
import SideExplorer from "../components/SideExplorer"

const Explorer: React.FC = () => {

    return (
        <div style={{ display: "flex", maxHeight: '100%', overflow: 'auto' }}>
            <Sidebar />
            <div style={{ width: '100%' }}>
                <div className="headerPage"><strong>Explorar</strong></div>
                <div style={{ margin: '120px 0px 0px 35px' }}>
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
                </div>
            </div>
            <SideExplorer>
                <CardExplorer>
                </CardExplorer>
            </SideExplorer>
        </div>
    )
}

export default Explorer


