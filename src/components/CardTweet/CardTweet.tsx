/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardTweetStyled } from "./CardTweetStyled";
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
import { TweetDto } from "../../config/services/tweet.service";

export interface CardTweetProps {
    tweet: TweetDto;
    reTweet?: TweetDto
    avatarTweet: TweetDto
    avatarReTweet: TweetDto
}

const CardTweet: React.FC<CardTweetProps> = ({ tweet, reTweet, avatarTweet, avatarReTweet }) => {

    const userAvatarTweet = avatarTweet.avatar
    const userAvatarRetweet = avatarReTweet.avatar
    //Aqui vai a logica de curtir e comentar pegando as informações do usuario e do Tweet

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
        <>
            <CardTweetStyled>
                <div style={{ margin: '15px 0px 5px 12px', display: 'flex', gap: '10px' }}>
                    <img style={{ height: '35px', width: '35px', borderRadius: '100%', border: '1px solid gold', margin: '0px 3px 5px 15px' }} src={userAvatarTweet} alt='avatar'></img>
                    <div>
                        <p style={{ maxWidth: '105px', minHeight: '15px', display: 'flex', alignItems: 'center' }}><strong style={{ paddingRight: '5px' }}>{`@${tweet.name}`}</strong><img style={{ height: '15px', width: '15px' }} src={selo}></img></p>
                        <p style={{ maxWidth: '105px', minHeight: '15px' }}>{tweet.username}</p>
                        <p className="styleMessage">{tweet.content}</p>
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
                </div>
            </CardTweetStyled>
            {tweet.tweeetOriginal && (
                <CardTweetStyled >
                    <div style={{ margin: '15px 0px 5px 12px', display: 'flex', gap: '10px' }}>
                        <img style={{ height: '25px', width: '25px', borderRadius: '100%', border: '1px solid gold', margin: '0px 3px 5px 15px' }} src={userAvatarRetweet} alt='avatar'></img>
                        <div>
                            <p style={{ maxWidth: '105px', minHeight: '15px', display: 'flex', alignItems: 'center' }}><strong style={{ paddingRight: '5px' }}>{`@${tweet.tweeetOriginal.name}`}</strong><img style={{ height: '15px', width: '15px' }} src={selo}></img></p>
                            <p style={{ maxWidth: '105px', minHeight: '15px' }}>{tweet.tweeetOriginal.username}</p>
                            <p className="styleMessage">{reTweet?.content}</p>
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
                    </div>
                </CardTweetStyled>
            )}
        </>
    )
}

export default CardTweet

