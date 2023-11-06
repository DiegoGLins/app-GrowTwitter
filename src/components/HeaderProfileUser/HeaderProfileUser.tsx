/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react"
import { AvatarHeaderUser, HeaderProfileUserStyled } from "./HeaderProfileUserStyled"
import iconeSeta from '/icone_seta.svg'
import selo from '/selo.svg'
import { useNavigate } from "react-router-dom"

interface HeaderProps {
    children?: React.ReactNode
}

const HeaderProfileUser: React.FC<HeaderProps> = ({ children }) => {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const [userData, setUserData] = useState({
        id: '',
        avatar: '',
        email: '',
        name: '',
        username: '',
    })

    const getAvatar = localStorage.getItem('avatar')

    function handleAvatar(): string {
        const gravatarUrl = `https://robohash.org/${getAvatar}.png`;
        return gravatarUrl;
    }

    const avatarUser = handleAvatar()

    useEffect(() => {
        if (!token) {
            return navigate('/')
        }

        const loggedData = localStorage.getItem('userLogged');
        const dataLogged = JSON.parse(loggedData!)

        function getLogged() {
            if (loggedData) {
                setUserData({
                    id: dataLogged?.looged?.id,
                    avatar: '',
                    email: dataLogged?.logged?.email,
                    name: dataLogged?.logged?.name,
                    username: dataLogged?.logged?.username
                }
                );
            }
        }
        getLogged()
    }, [])



    return (
        <>
            <HeaderProfileUserStyled>
                <div style={{ display: "flex", padding: '0px 10px 10px 0px' }}>
                    <button className="goBack"><img src={iconeSeta}></img></button>
                    <p style={{ padding: '0px 0px 0px 10px' }}> <strong>Perfil de {`@ ${userData.name}`}</strong></p>
                </div>
                <AvatarHeaderUser src={avatarUser} alt="avatarUser"></AvatarHeaderUser>
                <p style={{ paddingBottom: '5px', display: 'flex', alignItems: 'center' }}><strong style={{ paddingRight: '5px' }}>{userData.name}</strong><img style={{ height: '15px', width: '15px' }} src={selo}></img></p>
                <p>{`@ ${userData.username}`}</p>
            </HeaderProfileUserStyled>
            {children}
        </>
    )
}

export default HeaderProfileUser