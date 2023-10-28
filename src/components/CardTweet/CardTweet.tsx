import { AvatarTweet, CardTweetStyled } from "./CardTweetStyled";
import iconeResponder from '/icone_responder.svg'
import iconeResponderAzul from '/icone_responder_azul.svg'
import iconeCurtir from '/icone_curtir.svg'
import iconeCurtirRosa from '/icone_curtir_rosa.svg'
import { IconsTweetStyled } from "./IconsTweetStyled";
import selo from '/selo.svg'
import { useState } from "react";
import IconTweetComent from "./IconTweetComent";
import IconTweetLike from "./IconTweetLike";
import IconReTweet from "./IconReTweet";
import iconReTweet from "/icone_retweet.svg"
import iconReTweetLaranja from '/icone_retweet_laranja.svg'

export interface CardTweetProps {
    avatar: string;
    nameUser: string;
    usernameUser: string;
    message?: string;
}

const CardTweet: React.FC<CardTweetProps> = ({ avatar, nameUser, usernameUser, message }) => {
    //Aqui vai a logica de curtir e comentar pegando as informações do usuario e do Tweet do ContentContext

    const [isHoveredComent, setIsHoveredComent] = useState(false);
    const [isHoveredLike, setIsHoveredLike] = useState(false);
    const [isHoveredReTweet, setIsHoveredReTweet] = useState(false);

    const handleMouseEnterComent = () => {
        setIsHoveredComent(true);
    };

    const handleMouseLeaveComent = () => {
        setIsHoveredComent(false);
    };


    const handleMouseEnterLike = () => {
        setIsHoveredLike(true)
    }

    const handleMouseLeaveLike = () => {
        setIsHoveredLike(false)
    }

    const handleMouseEnterReTweet = () => {
        setIsHoveredReTweet(true)
    }

    const handleMouseLeaveReTweet = () => {
        setIsHoveredReTweet(false)
    }
    return (
        <CardTweetStyled>
            <AvatarTweet>
                <img src={avatar} alt='avatar'></img>
            </AvatarTweet>
            <div>
                <div style={{ margin: '15px 0px 5px 12px', display: 'flex', gap: '10px' }}>
                    <p style={{ maxWidth: '105px', minHeight: '15px', overflow: "visible", display: 'flex', alignItems: 'center' }}><strong style={{ paddingRight: '5px' }}>{`@${nameUser}`}</strong><img style={{ height: '15px', width: '15px' }} src={selo}></img></p>
                    <p style={{ maxWidth: '105px', minHeight: '15px', overflow: "visible" }}>{usernameUser}</p>
                </div>
                <p className="styleMessage">{message}</p>
                <IconsTweetStyled onClick={() => console.log()} onMouseEnter={handleMouseEnterComent} onMouseLeave={handleMouseLeaveComent}>
                    <IconTweetComent iconResponse={isHoveredComent ? iconeResponderAzul : iconeResponder} count={0}></IconTweetComent>
                </IconsTweetStyled>
                <IconsTweetStyled onMouseEnter={handleMouseEnterReTweet} onMouseLeave={handleMouseLeaveReTweet}>
                    <IconReTweet iconReTweet={isHoveredReTweet ? iconReTweetLaranja : iconReTweet} count={0}></IconReTweet>
                </IconsTweetStyled>
                <IconsTweetStyled onMouseEnter={handleMouseEnterLike} onMouseLeave={handleMouseLeaveLike}>
                    <IconTweetLike iconLike={isHoveredLike ? iconeCurtirRosa : iconeCurtir} count={0}></IconTweetLike>
                </IconsTweetStyled>
            </div>
        </CardTweetStyled>
    )
}

export default CardTweet