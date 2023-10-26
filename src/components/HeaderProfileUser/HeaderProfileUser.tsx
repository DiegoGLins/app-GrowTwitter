import { CardTweetProps } from "../CardTweet/CardTweet"
import { AvatarHeaderUser, HeaderProfileUserStyled } from "./HeaderProfileUserStyled"
import iconeSeta from '/icone_seta.svg'


const HeaderProfileUser: React.FC<CardTweetProps> = ({ avatar, usernameUser, nameUser }) => {
    return (
        <>
            <HeaderProfileUserStyled>
                <div style={{ display: "flex", padding: '0px 10px 10px 0px' }}>
                    <button className="goBack"><img src={iconeSeta}></img></button>
                    <p style={{ padding: '0px 0px 0px 10px' }}> <strong>Perfil de{usernameUser}</strong></p>
                </div>
                <AvatarHeaderUser src={avatar} alt="avatarUser"></AvatarHeaderUser>
                <p style={{ paddingBottom: '5px' }}><strong>{nameUser}</strong>gsg</p>
                <p>{usernameUser}fss</p>
            </HeaderProfileUserStyled>
        </>
    )
}

export default HeaderProfileUser