/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useEffect, useState } from "react"
import { CreateTweetRequest, create } from "../../config/services/tweet.service"
import { IconTogleMenuStyled } from "../IconTogleMenu/IconTogleMenuStyled"
import ModalTweetDefault from "../ModalTweetDefault"
import { ButtonTogleMenuStyled, TogleMenuStyled } from "../TogleMenu/TogleMenuStyled"
import { SideBarStyled } from "./SideBarStyled"
import logoGrowTweet from '/logo_growtweet.svg'
import { useNavigate } from "react-router-dom"
import iconePaginaInicial from '/icone_pagina_Inicial.svg'
import iconeExplorar from '/icone_explorar.svg'
import iconePerfilSelecionado from '/icone_perfil_selecionado.svg'
import IconTogleMenu from '../IconTogleMenu'
import { logout } from "../../config/services/auth.service"
import { getUserById } from "../../config/services/user.service"


const Sidebar: React.FC = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [nameAuthorTweet, setNameAuthorTweet] = useState<string>('')
    const [userNameUser, setUserNameUser] = useState<string>('')
    const [idUser, setIdUser] = useState<string>('')
    const [newTweet, setNewTweet] = useState<CreateTweetRequest[]>([])
    const [contentNewTeet, setContentNewtweet] = useState<string>('')
    const [contentTweet, setContentTweet] = useState<string>('')
    const [userData, setUserData] = useState({
        id: '',
        avatar: '',
        email: '',
        name: '',
        username: '',
    })

    const token = localStorage.getItem('token')


    useCallback(() => {
        function handleAvatar(): string {
            const random = Math.random().toString(36).substring(2, 10) + `@${userData.username}`;
            const gravatarUrl = `https://robohash.org/${random}.png`;
            return gravatarUrl;
        }
        handleAvatar()
    }, [])


    const avatarStorage = localStorage.getItem('avatar')
    function getAvatar(): string {
        const gravatarUrl = `https://robohash.org/${avatarStorage}.png`;
        return gravatarUrl;
    }
    const avatarUser = getAvatar()


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
            content: tweet.content,
            type: tweet.type,
            usernameAuthorTweet: tweet.usernameAuthorTweet,
            token: tweet.token
        }

        async function createTweet() {
            const response = await create(newTweet)

            if (response.code !== 201) {
                alert(response.message!)
                return;
            }
            setNewTweet(response.data!)
        }
        createTweet()
    }, [])


    async function logoutUser() {
        if (token) {
            console.log(token)
            const response = await logout(token)
            alert(response.message!)
            localStorage.setItem('userLogged', '')
            localStorage.setItem('token', '')
            localStorage.setItem('avatar', '')
            navigate('/')
        }
    }

    useEffect(() => {
        async function getLogged() {
            const response = await getUserById()
            setUserData({
                id: response.data?.id,
                avatar: response.data?.avatar,
                email: response.data?.email,
                name: response.data?.name,
                username: response.data?.username
            });

        }
        getLogged()

        localStorage.setItem("avatar", JSON.stringify(userData.avatar))
        // console.log(dataLogged)
        console.log(userData)

    }, [])

    return (
        <>
            <ModalTweetDefault openModal={isOpen} actionCancel={() => handleClose()} actionConfirm={() => addTweet({
                content: "",
                type: "N",
                token: ""
            })} message={contentNewTeet}>
            </ModalTweetDefault>
            <div>
                <SideBarStyled>
                    <div>
                        <img className="logoSideBar" style={{ height: '35px', width: '100px' }} src={logoGrowTweet}></img>
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
                    </div>
                    <div className="styleFooter">
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <div style={{ margin: '0px 0px 0px 8px', display: 'flex', flexDirection: 'column' }}>
                                <img style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="avatarFooter" src={avatarUser} alt='avatar-footer'></img>
                                <button onClick={logoutUser} className="buttonlogout"><strong>Sair</strong></button>
                            </div>
                            <div style={{ margin: '0px 0px 0px 5px', display: 'flex', flexDirection: "column" }}>
                                <p style={{ width: '130px', maxHeight: '35px', padding: '0px 0px 0px 5px' }}><strong>{userData?.name}</strong></p>
                                <p style={{ width: '130px', maxHeight: '35px' }}>{`@ ${userData?.username}`}</p>
                            </div>
                        </div>
                    </div>
                </SideBarStyled>
            </div>
        </>
    )
}

export default Sidebar