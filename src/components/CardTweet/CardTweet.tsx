import { AvatarTweet, CardTweetStyled } from "./CardTweetStyled";
import IconsTweet from "./IconsTweet";
import iconeResponder from '/icone_responder.svg'
import iconeCurtir from '/icone_curtir.svg'
import { IconsTweetStyled } from "./IconsTweetStyled";

export interface CardTweetProps {
    avatar: string;
    nameUser: string;
    usernameUser: string;
    message?: string;
}

const CardTweet: React.FC<CardTweetProps> = ({ avatar, nameUser, usernameUser, message }) => {
    //Aqui vai a logica de curtir e comentar pegando as informações do usuario e do Tweet do ContentContext

    return (
        <CardTweetStyled>
            <AvatarTweet src={avatar} alt='avatar-tweet'></AvatarTweet>
            <div>
                <div style={{ margin: '10px 0px 5px 15px', display: 'flex', gap: '10px' }}>
                    <p style={{ border: '1px solid #f015', width: '105px', height: '15px' }}><strong>{nameUser}</strong></p>
                    <p style={{ border: '1px solid #f015', width: '105px', height: '15px' }}>{usernameUser}</p>
                </div>
                <p style={{ minWidth: '100%', margin: '5px 0px 10px 15px', border: '1px solid #f015', overflow: "hidden", minHeight: '15px' }}>{message}</p>
                <IconsTweetStyled onClick={() => console.log()}>
                    <IconsTweet icon={iconeResponder} count={0}></IconsTweet>
                </IconsTweetStyled>
                <IconsTweetStyled>
                    <IconsTweet icon={iconeCurtir} count={0}></IconsTweet>
                </IconsTweetStyled>
            </div>
        </CardTweetStyled>
    )
}

export default CardTweet