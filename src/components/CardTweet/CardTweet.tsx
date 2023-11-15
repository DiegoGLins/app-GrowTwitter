/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { CardReTweetStyled, CardTweetStyled } from "./CardTweetStyled";
import iconeResponder from '/icone_responder.svg'
import iconeCurtir from '/icone_curtir.svg'
import { IconsTweetStyled } from "./IconsTweetStyled";
import selo from '/selo.svg'
import IconTweetComent from "./IconTweetComent";
import IconTweetLike from "./IconTweetLike";
import IconReTweet from "./IconReTweet";
import iconReTweet from "/icone_retweet.svg"
import { TweetDto } from "../../config/services/tweet.service";
import ComentCardTweet from "./ComentCardTweet";

export interface CardTweetProps {
    avatarTweet: string | null;
    avatarReTweet?: string | null;
    tweet: TweetDto;
    index: number
    name: string | null;
}

const CardTweet: React.FC<CardTweetProps> = ({
    tweet,
    avatarTweet,
    name,
    avatarReTweet,
}) => {

    const reTweetsUser = tweet.reTweet;
    const findNameReTweet = reTweetsUser?.map((item) => item.user?.name).map(item => item) || [];
    const findAvatarReTweet = reTweetsUser?.map((item) => item.user?.avatar).map(item => item)


    const avatarStorage = localStorage.getItem('avatar');
    function getAvatar(): string {
        const gravatarUrl = `https://robohash.org/${avatarStorage}.png`;
        return gravatarUrl;
    }
    const avatarUser = getAvatar();
    avatarTweet = avatarUser;

    function getRetweetAvatar(): string {
        const random = Math.random().toString(36).substring(2, 10) + `@${findAvatarReTweet}`;
        const gravatarUrl = `https://robohash.org/${random}.png`;
        return gravatarUrl;
    }
    const avatarRetweetUser = getRetweetAvatar();
    avatarReTweet = avatarRetweetUser

    return (
        <>
            {tweet.reTweet.length! > 0 &&
                <ComentCardTweet nameUserReTweet={findNameReTweet} avatarReTweet={avatarReTweet} />
            }
            <CardTweetStyled key={tweet.id}>
                {tweet.type === "N" && (
                    <div style={{ margin: '15px 15px 5px 12px', display: 'flex', gap: '10px' }}>
                        <img
                            style={{ height: '45px', width: '45px', borderRadius: '100%', border: '2px solid #ff8533' }}
                            src={avatarTweet!}
                            alt='avatar'
                        ></img>
                        <div>
                            <p style={{ maxWidth: '105px', minHeight: '15px', display: 'flex', alignItems: 'center' }}>
                                <strong style={{ paddingRight: '5px' }}>{tweet.authorTweet}</strong>
                                <img style={{ height: '15px', width: '15px' }} src={selo}></img>
                            </p>
                            <p style={{ maxWidth: '135px', minHeight: '15px', paddingTop: '4px' }}>{name}</p>
                            <p className="styleMessage">{tweet.content}</p>
                            <IconsTweetStyled>
                                <IconTweetComent iconResponse={iconeResponder} count={0}></IconTweetComent>
                            </IconsTweetStyled>
                            <IconsTweetStyled>
                                <IconReTweet iconReTweet={iconReTweet} count={0}></IconReTweet>
                            </IconsTweetStyled>
                            <IconsTweetStyled >
                                <IconTweetLike iconLike={iconeCurtir} count={0}></IconTweetLike>
                            </IconsTweetStyled>
                        </div>
                    </div>
                )}
            </CardTweetStyled>
            {tweet.reTweet.length! > 0 && reTweetsUser?.map((reTweet) => (
                <CardReTweetStyled key={reTweet.id}>
                    <div style={{ margin: '15px 15px 5px 12px', display: 'flex', gap: '5px' }}>
                        <img
                            style={{ height: '35px', width: '35px', borderRadius: '100%', border: '1px solid #5c534d', margin: '3px 3px 5px 15px' }}
                            src={avatarReTweet!}
                            alt='avatar'
                        ></img>
                        <div>
                            <p style={{ maxWidth: '105px', minHeight: '15px', display: 'flex', alignItems: 'center' }}>
                                <strong style={{ paddingRight: '5px' }}>{`${reTweet.authorTweet}`}</strong>
                                <img style={{ height: '15px', width: '15px' }} src={selo} alt="selo"></img>
                            </p>
                            <p style={{ maxWidth: '135px', minHeight: '15px', paddingTop: '4px' }}>{reTweet.user.name}</p>
                            <p className="styleMessageReTweet">{reTweet.content}</p>
                            <IconsTweetStyled>
                                <IconTweetComent iconResponse={iconeResponder} count={0}></IconTweetComent>
                            </IconsTweetStyled>
                            <IconsTweetStyled >
                                <IconReTweet iconReTweet={iconReTweet} count={0}></IconReTweet>
                            </IconsTweetStyled>
                            <IconsTweetStyled >
                                <IconTweetLike iconLike={iconeCurtir} count={0}></IconTweetLike>
                            </IconsTweetStyled>
                        </div>
                    </div>
                </CardReTweetStyled>
            ))}
        </>
    )
}

export default CardTweet;

