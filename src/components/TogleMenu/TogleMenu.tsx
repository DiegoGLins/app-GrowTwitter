import { TogleMenuStyled } from "./TogleMenuStyled";
import iconePaginaInicial from '/icone_pagina_Inicial.svg'
import iconeExplorar from '/icone_explorar.svg'
import iconePerfilSelecionado from '/icone_perfil_selecionado.svg'
import IconTogleMenu from '../IconTogleMenu'
import { IconTogleMenuStyled } from "../IconTogleMenu/IconTogleMenuStyled";
import { useNavigate } from "react-router-dom";
interface TogleMenuProps {
    children?: React.ReactNode;
}

const TogleMenu: React.FC<TogleMenuProps> = ({ children }) => {
    const navigate = useNavigate()

    const navigateProfileUser = () => {
        navigate('/profile-user')
    }

    const navigateHome = () => {
        navigate('/home')
    }

    const navigateExplorer = () => {
        navigate('/explorer')
    }


    return (
        <TogleMenuStyled>
            <IconTogleMenuStyled onClick={navigateHome} className="iconTogleButton">
                <IconTogleMenu icon={iconePaginaInicial} title={"Pagina Inicial"} />
            </IconTogleMenuStyled>
            <IconTogleMenuStyled onClick={navigateExplorer} className="iconTogleButton">
                <IconTogleMenu icon={iconeExplorar} title={"Explorar"} />
            </IconTogleMenuStyled>
            <IconTogleMenuStyled onClick={navigateProfileUser} className="iconTogleButton">
                <IconTogleMenu icon={iconePerfilSelecionado} title={"Perfil"} />
            </IconTogleMenuStyled>
            {children}
        </TogleMenuStyled>
    )
}

export default TogleMenu