/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const [isHoveredComent, setIsHoveredComent] = useState(false);
    const [isHoveredLike, setIsHoveredLike] = useState(false);
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

    const findAvatatReTweet = reTweetsUser.find((item) => item.user.avatar)?.avatarTweet;
    function getRetweetAvatar(): string {
        const gravatarUrl = `https://robohash.org/${findAvatatReTweet}.png`;
        return gravatarUrl;
    }
    const avatarRetweetUser = getRetweetAvatar();
    avatarReTweet = avatarRetweetUser;

    const handleMouseEnterComent = () => {
        setIsHoveredComent(true);
    };

    const handleMouseLeaveComent = () => {
        setIsHoveredComent(false);
    };

    const handleMouseEnterLike = () => {
        setIsHoveredLike(true);
    };

    const handleMouseLeaveLike = () => {
        setIsHoveredLike(false);
    };

    const handleMouseEnterReTweet = () => {
        setIsHoveredReTweet(true);
    };

    const handleMouseLeaveReTweet = () => {
        setIsHoveredReTweet(false);
    };

    console.log(findAuthorReTweet);

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
                </CardReTweetStyled>
            )}
        </>
    );
};

export default CardTweet;


