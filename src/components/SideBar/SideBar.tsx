/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useState } from "react"
import { CreateTweetRequest, create } from "../../config/services/tweet.service"
import { IconTogleMenuStyled } from "../IconTogleMenu/IconTogleMenuStyled"
import ModalTweetDefault from "../ModalTweetDefault"
import { ButtonTogleMenuStyled, TogleMenuStyled } from "../TogleMenu/TogleMenuStyled"
import { SideBarStyled } from "./SideBarStyled"
import logoGrowTweet from '/logo_growtweet.svg'
import * as C from '../../App.styles'
import { useNavigate } from "react-router-dom"
import iconePaginaInicial from '/icone_pagina_Inicial.svg'
import iconeExplorar from '/icone_explorar.svg'
import iconePerfilSelecionado from '/icone_perfil_selecionado.svg'
import IconTogleMenu from '../IconTogleMenu'

interface SideBarProps {
    children?: React.ReactNode
}

const Sidebar: React.FC<SideBarProps> = ({ children }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [nameAuthorTweet, setNameAuthorTweet] = useState<string>('')
    const [userNameUser, setUserNameUser] = useState<string>('')
    const [idUser, setIdUser] = useState<string>('')
    const [error, setError] = useState('Nenhum tweet para listar');
    const [newTweet, setNewTweet] = useState<CreateTweetRequest[]>([])
    const [contentNewTeet, setContentNewtweet] = useState<string>('')
    const [contentTweet, setContentTweet] = useState<string>('')

    const token = localStorage.getItem('token')

    function handleClose() {
        setIsOpen(false)
    }

    function handleOpen() {
        setIsOpen(true)
    }

    const navigateProfileUser = () => {
        navigate('/profile-user')
    }

    const navigateHome = () => {
        navigate('/home')
    }

    const navigateExplorer = () => {
        navigate('/explorer')
    }

    const addTweet = useCallback((tweet: CreateTweetRequest) => {

        if (!token) {
            return;
        }

        const newTweet: CreateTweetRequest = {
            idUser: `${idUser}`,
            usernameAuthorTweet: `${userNameUser}`,
            nameUser: `${nameAuthorTweet}`,
            content: tweet.content,
            token: token!
        }

        async function createTweet() {
            const response = await create(newTweet)

            if (response.code !== 201) {
                setError(response.message!)
                return;
            }

            setError('')
            setNewTweet(response.data!)
        }
        createTweet()
    }, [])

    return (
        <>
            <ModalTweetDefault openModal={isOpen} actionCancel={() => handleClose()} actionConfirm={() => addTweet({
                idUser: idUser,
                nameUser: nameAuthorTweet,
                usernameAuthorTweet: userNameUser,
                content: '',
                token: token!
            })} message={contentNewTeet}>
            </ModalTweetDefault>
            <div>
                <C.ContatinerLayoutDefault>
                    <C.ContainerSideBarDefault>
                        <SideBarStyled>
                            <div className="logoSideBar">
                                <img style={{ height: '35px', width: '100px' }} src={logoGrowTweet}></img>
                            </div>
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
                                <ButtonTogleMenuStyled onClick={handleOpen} className='buttonTweet' type='button'>Tweetar</ButtonTogleMenuStyled>
                            </TogleMenuStyled>
                        </SideBarStyled>
                        {children}
                    </C.ContainerSideBarDefault>
                </C.ContatinerLayoutDefault>
            </div>
        </>
    )
}

export default Sidebar