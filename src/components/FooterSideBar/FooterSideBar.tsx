import { FooterButton, FooterSideBarStyled } from "./FooterSidebarStyled";

interface FooterSideBarProps {
    avatar: string;
    nameUser: string;
    usernameUser: string;
}

const FooterSideBar: React.FC<FooterSideBarProps> = ({ avatar, nameUser, usernameUser }) => {
    return (
        <FooterSideBarStyled>
            <div style={{ margin: '5px 0px 15px 5px', display: 'flex', flexDirection: 'column' }}>
                <img className="avatarFooter" src={avatar} alt='avatar-footer'></img>
                <FooterButton className="logout">Sair</FooterButton>
            </div>
            <div style={{ margin: '10px 0px 5px 5px' }}>
                <p style={{ border: '1px solid #f015', width: '95px', height: '20px' }}>{nameUser}</p>
                <p style={{ border: '1px solid #f015', width: '95px', height: '20px' }}>{usernameUser}</p>
            </div>
        </FooterSideBarStyled>
    )
}

export default FooterSideBar