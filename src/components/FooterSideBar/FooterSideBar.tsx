/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router";
import { FooterButton, FooterSideBarStyled } from "./FooterSidebarStyled";
import { logout } from "../../config/services/auth.service";
import { useState } from "react";

interface FooterSideBarProps {
    avatar: string;
    nameUser: string;
    usernameUser: string;
    children?: React.ReactNode
}

const FooterSideBar: React.FC<FooterSideBarProps> = ({ avatar, nameUser, usernameUser }) => {
    const [alert, setAlert] = useState('')

    const navigate = useNavigate()

    const logged = localStorage.getItem('token')

    async function logoutUser() {

        if (logged) {
            const response = await logout(logged)
            setAlert(response.message!)
            localStorage.setItem('token', '')
            navigate('/')
        }
    }


    return (
        <FooterSideBarStyled>
            <div style={{ margin: '5px 0px 15px 5px', display: 'flex', flexDirection: 'column' }}>
                <img className="avatarFooter" src={avatar} alt='avatar-footer'></img>
                <FooterButton onClick={logoutUser} className="logout">Sair</FooterButton>
            </div>
            <div style={{ margin: '10px 0px 5px 5px' }}>
                <p style={{ border: '1px solid #f015', width: '95px', height: '20px' }}>{nameUser}</p>
                <p style={{ border: '1px solid #f015', width: '95px', height: '20px' }}>{usernameUser}</p>
            </div>
        </FooterSideBarStyled>
    )
}

export default FooterSideBar