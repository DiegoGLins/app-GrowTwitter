/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useEffect, useState } from "react"
import { CreateTweetRequest, TweetDto, create } from "../../config/services/tweet.service"
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
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material"
import DialogLogout from "../DialogLogout"
import { logout } from "../../config/services/auth.service"

const Sidebar: React.FC = () => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [openDialogLogout, setOpenDialogLogout] = useState<boolean>(false)
    const [newTweet, setNewTweet] = useState<CreateTweetRequest[]>([])
    const [contentTweet, setContentTweet] = useState<string>('')
    const [userData, setUserData] = useState({
        id: '',
        avatar: '',
        email: '',
        name: '',
        username: '',
        token: '',
    })

    const handleAvatar = useCallback(() => {
        const random = Math.random().toString(36).substring(2, 10) + `@${userData.username}`;
        const gravatarUrl = `https://robohash.org/${random}.png`;
        return gravatarUrl;

    }, [])

    handleAvatar()

    localStorage.setItem("avatar", JSON.stringify(userData.avatar))
    const logged = localStorage.getItem("userLogged")
    const dataLogged = JSON.parse(logged!)


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

    const token = localStorage.getItem('token')

    const addTweet = useCallback((tweet: CreateTweetRequest) => {
        if (tweet.content.length < 2) {
            return alert("Mensagem precisa ter pelo menos dois caractéres")
        }
        const createNewTweet: CreateTweetRequest = {
            content: tweet.content,
            idUser: tweet.idUser,
            type: tweet.type,
            usernameAuthorTweet: tweet.usernameAuthorTweet,
            token: tweet.token
        }

        async function createTweet() {
            const response = await create(createNewTweet)
            if (response.code !== 201) {
                alert(response.message!)
                return;
            }
            setNewTweet(response?.data!)
        }
        createTweet()
        handleClose()
    }, [navigate])

    async function logoutUser() {
        if (token) {
            const logged = await logout(token)
            if (logged) {
                localStorage.clear()
                navigate('/')
            }
        }
    }

    useEffect(() => {
        function getLogged() {
            if (dataLogged) {
                setUserData({
                    id: dataLogged.logged.id,
                    avatar: dataLogged.logged.avatar,
                    email: dataLogged.logged.email,
                    name: dataLogged.logged.name,
                    username: dataLogged.logged.username,
                    token: dataLogged.logged.token
                });
            }
        }
        getLogged()
    }, [])


    return (
        <>
            <DialogLogout open={openDialogLogout} actionConfirm={logoutUser} actionCancel={() => setOpenDialogLogout(false)} />
            <ModalTweetDefault openModal={isOpen} actionCancel={() => handleClose()}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TextField placeholder="Digite sua mensagem" fullWidth value={contentTweet} className='size-box-tweet' onChange={(e) => setContentTweet(e.target.value)}></TextField>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => addTweet({
                        content: contentTweet,
                        idUser: userData.id,
                        type: "N",
                        token: userData.token
                    })}>
                        Tweetar
                    </Button>
                </DialogActions>
            </ModalTweetDefault >
            <div style={{ borderRight: '2px solid #e9e9e9' }}>
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
                        <div style={{ display: 'flex', alignItems: 'flex-start', position: 'fixed' }}>
                            <div style={{ margin: '0px 0px 0px 8px', display: 'flex', flexDirection: 'column' }}>
                                <img style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="avatarFooter" src={avatarUser} alt='avatar-footer'></img>
                                <button onClick={() => setOpenDialogLogout(true)} className="buttonlogout"><strong>Sair</strong></button>
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