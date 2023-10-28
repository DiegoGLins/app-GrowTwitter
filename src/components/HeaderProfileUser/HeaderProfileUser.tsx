import { CardTweetProps } from "../CardTweet/CardTweet"
import { AvatarHeaderUser, HeaderProfileUserStyled } from "./HeaderProfileUserStyled"
import iconeSeta from '/icone_seta.svg'
import selo from '/selo.svg'


const HeaderProfileUser: React.FC<CardTweetProps> = ({ avatar, usernameUser, nameUser }) => {
    return (
        <>
            <HeaderProfileUserStyled>
                <div style={{ display: "flex", padding: '0px 10px 10px 0px' }}>
                    <button className="goBack"><img src={iconeSeta}></img></button>
                    <p style={{ padding: '0px 0px 0px 10px' }}> <strong>Perfil de {`@ ${usernameUser}`}</strong></p>
                </div>
                <AvatarHeaderUser src={avatar} alt="avatarUser"></AvatarHeaderUser>
                <p style={{ paddingBottom: '5px', display: 'flex', alignItems: 'center' }}><strong style={{ paddingRight: '5px' }}>{nameUser}</strong><img style={{ height: '15px', width: '15px' }} src={selo}></img></p>
                <p>{`@ ${usernameUser}`}</p>
            </HeaderProfileUserStyled>
        </>
    )
}

export default HeaderProfileUser