/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react"
import { AvatarHeaderUser, HeaderProfileUserStyled } from "./HeaderProfileUserStyled"
import iconeSeta from '/icone_seta.svg'
import selo from '/selo.svg'
import { useNavigate } from "react-router-dom"

const HeaderProfileUser: React.FC = () => {
    const navigate = useNavigate()

    const [avatar, setAvatar] = useState<string>('')

    const token = localStorage.getItem('token')

    const [userData, setUserData] = useState({
        id: '',
        email: '',
        name: '',
        username: '',
    })


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
                    email: dataLogged?.logged?.email,
                    name: dataLogged?.logged?.name,
                    username: dataLogged?.logged?.username
                }
                );
            }

        }
        getLogged()
    }, [])

    // useEffect(() => {
    //     if (!logged) {
    //         return
    //     }
    //     async function getUser() {
    //         const response = await listUsers()

    //         if (response.code !== 200) {
    //             return setError(response.message!)
    //         }
    //         //console.log(logged)
    //         const user = response!.data!
    //         setUserLogged(user)
    //         setId(id)
    //         setNameAuthorTweet(dataContext?.data?.name!)
    //         setUsernameUser(dataContext?.data?.username!)
    //         setAvatar(dataContext?.data?.avatar!)
    //         // console.log(userLogged)
    //         // setUserLogged(userLogged!.name!)
    //         console.log(response)
    //     }

    //     getUser()


    // }, [id])

    return (
        <>
            <HeaderProfileUserStyled>
                <div style={{ display: "flex", padding: '0px 10px 10px 0px' }}>
                    <button className="goBack"><img src={iconeSeta}></img></button>
                    <p style={{ padding: '0px 0px 0px 10px' }}> <strong>Perfil de {`@ ${userData.name}`}</strong></p>
                </div>
                <AvatarHeaderUser src={avatar} alt="avatarUser"></AvatarHeaderUser>
                <p style={{ paddingBottom: '5px', display: 'flex', alignItems: 'center' }}><strong style={{ paddingRight: '5px' }}>{userData.name}</strong><img style={{ height: '15px', width: '15px' }} src={selo}></img></p>
                <p>{`@ ${userData.username}`}</p>
            </HeaderProfileUserStyled>
        </>
    )
}

export default HeaderProfileUser