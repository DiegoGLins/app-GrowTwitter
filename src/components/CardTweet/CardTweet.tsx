import { AvatarTweet, CardTweetStyled } from "./CardTweetStyled";
import IconsTweet from "./IconsTweet";
import iconeResponder from '/icone_responder.svg'
import iconeCurtir from '/icone_curtir.svg'

export interface CardTweetProps {
    avatar: string;
    nameUser: string;
    usernameUser: string;
    message?: string;
}

const CardTweet: React.FC<CardTweetProps> = ({ avatar, nameUser, usernameUser, message }) => {
    return (
        <CardTweetStyled>
            <AvatarTweet src={avatar} alt='avatar-tweet'></AvatarTweet>
            <div>
                <div style={{ margin: '10px 0px 5px 15px', display: 'flex', gap: '10px' }}>
                    <p style={{ border: '1px solid #f015', width: '105px', height: '15px' }}><strong>{nameUser}</strong></p>
                    <p style={{ border: '1px solid #f015', width: '105px', height: '15px' }}>{usernameUser}</p>
                </div>
                <p style={{ minWidth: '100%', margin: '5px 5px 10px 15px', border: '1px solid #f015', overflow: "hidden", minHeight: '15px' }}>{message}</p>
                <IconsTweet iconComent={iconeResponder} iconLike={iconeCurtir} countComent={0} countLike={0}></IconsTweet>
            </div>
        </CardTweetStyled>
    )
}

export default CardTweet