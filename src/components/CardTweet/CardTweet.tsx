/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { CardReTweetStyled, CardTweetStyled } from "./CardTweetStyled";
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
import ComentCardTweet from "./ComentCardTweet";

export interface CardTweetProps {
    avatarTweet: string | null;
    avatarReTweet?: string | null;
    tweet: TweetDto;
    reTweet?: TweetDto;
    name: string | null;
}

const CardTweet: React.FC<CardTweetProps> = ({
    tweet,
    avatarTweet,
    name,
    avatarReTweet,
}) => {
    const [isHoveredComentTweet, setIsHoveredComentTweet] = useState(false);
    const [isHoveredComentReTweet, setIsHoveredComentReTweet] = useState(false);
    const [isHoveredLikeTweet, setIsHoveredLikeTweet] = useState(false);
    const [isHoveredLikeReTweet, setIsHoveredLikeReTweet] = useState(false);
    const [isHoveredTweet, setIsHoveredTweet] = useState(false);
    const [isHoveredReTweet, setIsHoveredReTweet] = useState(false);

    const reTweetsUser = tweet.reTweet;
    const findRetweetsContent = reTweetsUser.map((item) => item.content);
    const findAuthorReTweet = reTweetsUser.map((item) => item.authorTweet);
    const findNameReTweet = reTweetsUser?.find((item) => item.user?.name)?.user.name;

    const avatarStorage = localStorage.getItem('avatar');
    function getAvatar(): string {
        const gravatarUrl = `https://robohash.org/${avatarStorage}.png`;
        return gravatarUrl;
    }
    const avatarUser = getAvatar();
    avatarTweet = avatarUser;

    const findAvatarReTweet = reTweetsUser.map((item) => item.user.avatar)
    function getRetweetAvatar(): string {
        const gravatarUrl = `https://robohash.org/${findAvatarReTweet}.png`;
        return gravatarUrl;
    }
    const avatarRetweetUser = getRetweetAvatar();
    avatarReTweet = avatarRetweetUser;

    const handleMouseEnterComentTweet = () => {
        setIsHoveredComentTweet(true);
        console.log(isHoveredComentTweet)
    };


    const handleMouseEnterComentReTweet = () => {
        setIsHoveredComentReTweet(true);
    };


    const handleMouseLeaveComentTweet = () => {
        setIsHoveredComentTweet(false);
        console.log(isHoveredComentTweet)
    };

    const handleMouseLeaveComentReTweet = () => {
        setIsHoveredComentReTweet(false);
    };


    const handleMouseEnterLikeTweet = () => {
        setIsHoveredLikeTweet(true);
    };

    const handleMouseEnterLikeReTweet = () => {
        setIsHoveredLikeReTweet(true);
    };

    const handleMouseLeaveLikeTweet = () => {
        setIsHoveredLikeTweet(false);
    };

    const handleMouseLeaveLikeReTweet = () => {
        setIsHoveredLikeReTweet(false);
    };

    const handleMouseEnterTweet = () => {
        setIsHoveredTweet(true);
    };

    const handleMouseEnterReTweet = () => {
        setIsHoveredReTweet(true);
    };

    const handleMouseLeaveTweet = () => {
        setIsHoveredTweet(false);
    };

    const handleMouseLeaveReTweet = () => {
        setIsHoveredReTweet(false);
    };


    return (
        <>
            <CardTweetStyled>
                {findRetweetsContent.length > 0 &&
                    <ComentCardTweet nameUserReTweet={findNameReTweet!} avatarReTweet={avatarReTweet} />
                }
                <div style={{ margin: '15px 15px 5px 12px', display: 'flex', gap: '10px' }}>
                    <img
                        style={{ height: '45px', width: '45px', borderRadius: '100%', border: '2px solid #ff8533' }}
                        src={avatarTweet}
                        alt='avatar'
                    ></img>
                    <div>
                        <p style={{ maxWidth: '105px', minHeight: '15px', display: 'flex', alignItems: 'center' }}>
                            <strong style={{ paddingRight: '5px' }}>{tweet.authorTweet}</strong>
                            <img style={{ height: '15px', width: '15px' }} src={selo}></img>
                        </p>
                        <p style={{ maxWidth: '135px', minHeight: '15px', paddingTop: '4px' }}>{name}</p>
                        <p className="styleMessage">{tweet.content}</p>
                        <IconsTweetStyled onClick={() => console.log()} onMouseEnter={handleMouseEnterComentTweet} onMouseLeave={handleMouseLeaveComentTweet}>
                            <IconTweetComent iconResponse={isHoveredComentTweet ? iconeResponderAzul : iconeResponder} count={0}></IconTweetComent>
                        </IconsTweetStyled>
                        <IconsTweetStyled onMouseEnter={handleMouseEnterTweet} onMouseLeave={handleMouseLeaveTweet}>
                            <IconReTweet iconReTweet={isHoveredTweet ? iconReTweetLaranja : iconReTweet} count={0}></IconReTweet>
                        </IconsTweetStyled>
                        <IconsTweetStyled onMouseEnter={handleMouseEnterLikeTweet} onMouseLeave={handleMouseLeaveLikeTweet}>
                            <IconTweetLike iconLike={isHoveredLikeTweet ? iconeCurtirRosa : iconeCurtir} count={0}></IconTweetLike>
                        </IconsTweetStyled>
                    </div>
                </div>
            </CardTweetStyled>

            {findRetweetsContent.length > 0 && (
                <CardReTweetStyled>
                    <div style={{ margin: '15px 15px 5px 12px', display: 'flex', gap: '5px' }}>
                        <img
                            style={{ height: '35px', width: '35px', borderRadius: '100%', border: '1px solid #5c534d', margin: '3px 3px 5px 15px' }}
                            src={avatarReTweet}
                            alt='avatar'
                        ></img>
                        <div>
                            <p style={{ maxWidth: '105px', minHeight: '15px', display: 'flex', alignItems: 'center' }}>
                                <strong style={{ paddingRight: '5px' }}>{`@${findAuthorReTweet}`}</strong>
                                <img style={{ height: '15px', width: '15px' }} src={selo}></img>
                            </p>
                            <p style={{ maxWidth: '105px', minHeight: '15px', paddingTop: '4px' }}>{findNameReTweet}</p>
                            <p className="styleMessageReTweet">{findRetweetsContent}</p>
                            <IconsTweetStyled onClick={() => console.log()} onMouseEnter={handleMouseEnterComentReTweet} onMouseLeave={handleMouseLeaveComentReTweet}>
                                <IconTweetComent iconResponse={isHoveredComentReTweet ? iconeResponderAzul : iconeResponder} count={0}></IconTweetComent>
                            </IconsTweetStyled>
                            <IconsTweetStyled onMouseEnter={handleMouseEnterReTweet} onMouseLeave={handleMouseLeaveReTweet}>
                                <IconReTweet iconReTweet={isHoveredReTweet ? iconReTweetLaranja : iconReTweet} count={0}></IconReTweet>
                            </IconsTweetStyled>
                            <IconsTweetStyled onMouseEnter={handleMouseEnterLikeReTweet} onMouseLeave={handleMouseLeaveLikeReTweet}>
                                <IconTweetLike iconLike={isHoveredLikeReTweet ? iconeCurtirRosa : iconeCurtir} count={0}></IconTweetLike>
                            </IconsTweetStyled>
                        </div>
                    </div>
                </CardReTweetStyled>
            )}
        </>
    );
};

export default CardTweet;

