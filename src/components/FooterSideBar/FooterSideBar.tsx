/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router";
import { FooterButton, FooterSideBarStyled } from "./FooterSidebarStyled";
import { logout } from "../../config/services/auth.service";
import { useEffect, useState } from "react";

interface FooterSideBarProps {
    avatar: string;
    children?: React.ReactNode
}

interface loggedType {
    id: string,
    email: string,
    name: string
    username: string
}

const FooterSideBar: React.FC<FooterSideBarProps> = ({ avatar }) => {

    const navigate = useNavigate()
    const [alert, setAlert] = useState('')
    const [userData, setUserData] = useState({
        id: '',
        email: '',
        name: '',
        username: '',
    })

    const token = localStorage.getItem('token')
    const loggedData = localStorage.getItem('userLogged');
    let dataLogged: loggedType = {
        id: "",
        email: "",
        name: "",
        username: ""
    }

    if (loggedData) {
        dataLogged = JSON.parse(loggedData!)
    }

    async function logoutUser() {

        if (loggedData) {
            const response = await logout(token!)
            setAlert(response.message!)
            localStorage.setItem('userLogged', '')
            localStorage.setItem('token', '')
            navigate('/')
        }
    }

    useEffect(() => {
        function getLogged() {
            setUserData({
                id: dataLogged.id,
                email: dataLogged.email,
                name: dataLogged.name,
                username: dataLogged.username
            }
            );
        }
        getLogged()
    }, [])


    return (
        <FooterSideBarStyled>
            <div style={{ margin: '5px 0px 0px 5px', display: 'flex', flexDirection: 'column' }}>
                <img className="avatarFooter" src={avatar} alt='avatar-footer'></img>
                <FooterButton onClick={logoutUser} className="logout">Sair</FooterButton>
            </div>
            <div style={{ margin: '5px 0px 0px 10px', gap: '5px' }}>
                <p style={{ width: '100px', height: '20px', paddingBottom: '5px', overflow: 'visible' }}><strong>{userData?.name}</strong></p>
                <p style={{ width: '100px', height: '20px' }}>{userData?.username}</p>
            </div>
        </FooterSideBarStyled>
    )
}

export default FooterSideBar