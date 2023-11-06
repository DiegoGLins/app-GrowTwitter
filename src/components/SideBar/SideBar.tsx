/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useEffect, useMemo, useState } from "react"
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
import md5 from "md5"
import { UserDto, getUserById } from "../../config/services/user.service"

interface SideBarProps {
    avatar?: string
}

const Sidebar: React.FC<SideBarProps> = ({ avatar }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [nameAuthorTweet, setNameAuthorTweet] = useState<string>('')
    const [userNameUser, setUserNameUser] = useState<string>('')
    const [idUser, setIdUser] = useState<string>('')
    const [error, setError] = useState('Nenhum tweet para listar');
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


    function handleAvatar(): string {
        const random = Math.random().toString(36).substring(2, 10) + `@${userData.username}`;
        const gravatarUrl = `https://robohash.org/${random}.png`;
        return gravatarUrl;
    }
    handleAvatar()

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


    async function logoutUser() {
        if (token) {
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
            setUserData(response.data);

        }
        getLogged()

        localStorage.setItem("avatar", JSON.stringify(userData.avatar))
        // console.log(dataLogged)
        console.log(userData)

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
                        <div style={{ margin: '5px 0px 0px 5px', display: 'flex', flexDirection: 'column' }}>
                            <img style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="avatarFooter" src={avatarUser} alt='avatar-footer'></img>
                            <button onClick={logoutUser} className="logout">Sair</button>
                        </div>
                        <div style={{ margin: '5px 0px 0px 10px', gap: '15px', display: 'flex', flexDirection: "column" }}>
                            <p style={{ width: '130px', height: '20px', padding: '0px 0px 5px 5px', overflow: 'visible' }}><strong>{userData?.name}</strong></p>
                            <p style={{ width: '130px', height: '20px' }}>{`@ ${userData?.username}`}</p>
                        </div>
                    </div>
                </SideBarStyled>
            </div>
        </>
    )
}

export default Sidebar