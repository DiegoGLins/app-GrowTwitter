/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { CardReTweetStyled, CardTweetStyled } from "./CardTweetStyled";
import iconeResponder from '/icone_responder.svg'
import iconeCurtir from '/icone_curtir.svg'
import { IconsTweetStyled } from "./IconsTweetStyled";
import selo from '/selo.svg'
import iconCoracaoAnimado from '/icon-coracao-rosa.gif'
import iconCoracaoLiked from '/coracao_liked.png'
import IconTweetComent from "./IconTweetComent";
import IconTweetLike from "./IconTweetLike";
import IconComentAzul from '/icone_comentarios_azul.svg'
import { CreateReTweetRequest, TweetDto, createReTweet } from "../../config/services/tweet.service";
import ComentCardTweet from "./ComentCardTweet";
import { useCallback, useEffect, useState } from "react";
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";
import ModalTweetDefault from "../ModalTweetDefault";
import { LikeCreateDto, createLike } from "../../config/services/like.service";
import { deleteLike } from '../../config/services/like.service'
export interface CardTweetProps {
    avatarTweet: string | null;
    avatarReTweet?: string | null;
    tweet: TweetDto;
    index: number;
    name: string | null;
    children?: React.ReactNode
}

const CardTweet: React.FC<CardTweetProps> = ({ tweet, avatarTweet, name, avatarReTweet, index, children }) => {

    const [newTweet, setNewTweet] = useState<CreateReTweetRequest[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [contentTweet, setContentTweet] = useState<string>('')
    const [dataLikesLocal, setDataLikesLocal] = useState<LikeCreateDto[] | []>([])
    const [isLikeFinish, setIsLikeFinish] = useState<boolean>(false)
    const [heartLiked, setHeartLiked] = useState<boolean>(false)
    const [userData, setUserData] = useState({
        id: '',
        avatar: '',
        email: '',
        name: '',
        username: '',
        token: '',
    })

    const reTweetsUser = tweet.reTweet;
    const findNameReTweet = reTweetsUser?.map((item) => item.user?.name).map(item => item) || [];
    const findAvatarReTweet = tweet.reTweet.map(item => item.authorTweet)

    const avatarStorage = localStorage.getItem('avatar');
    function getAvatarUserLogged(): string {
        const gravatarUrl = `https://robohash.org/${avatarStorage}.png`;
        return gravatarUrl;
    }

    function getAvatarAllAvatar(): string {
        const random = Math.random().toString(36).substring(2, 10) + `@${tweet.authorTweet}`;
        const gravatarUrl = `https://robohash.org/${random}.png`;
        return gravatarUrl;
    }

    function getRetweetAvatar(): string {
        const random = Math.random().toString(36).substring(2, 10) + `@${findAvatarReTweet}`;
        const gravatarUrl = `https://robohash.org/${random}.png`;
        return gravatarUrl;
    }

    const avatarAllUser = getAvatarAllAvatar();
    const avatarLogged = getAvatarUserLogged()
    const avatarRetweetUser = getRetweetAvatar();
    avatarTweet = userData.username === tweet.authorTweet ? avatarLogged : avatarAllUser
    avatarReTweet = tweet.authorTweet === avatarTweet ? avatarLogged : avatarRetweetUser

    const logged = localStorage.getItem("userLogged")
    const dataLogged = JSON.parse(logged!)
    console.log(avatarTweet)
    console.log(avatarReTweet)
    useEffect(() => {
        function getLogged() {
            if (dataLogged) {
                setUserData({
                    id: dataLogged.logged.id,
                    avatar: dataLogged.logged.avatar,
                    email: dataLogged.logged.email,
                    name: dataLogged.logged.name,
                    username: dataLogged.logged.username,
                    token: dataLogged.logged.token
                });
            }
        }

        getLogged()
    }, [dataLikesLocal])


    function handleClose() {
        setIsOpen(false)
    }

    async function like(idTweet?: string, idReTwet?: string) {
        const userLiked = tweet.likes.some(item => item.idAuthorLike === userData.id)

        setHeartLiked(true);
        if (!userLiked) {
            const liked: LikeCreateDto = {
                idTweet: idTweet || null,
                idReTweet: idReTwet || null,
                idAuthorTweet: tweet.authorTweet,
                idAuthorLike: userData.id,
                authorLike: userData.username,
            }

            const response = await createLike(liked)
            if (response.ok) {
                setHeartLiked(true);
                tweet.likes.push(liked)
                setDataLikesLocal(prev => [...prev, liked])
                setTimeout(() => {
                    setHeartLiked(false);
                }, 1000)
                setIsLikeFinish(true)
            }

            console.log(tweet.likes)
        } else {
            removeLike()
        }
        setHeartLiked(false);
        setIsLikeFinish(false);
    }

    async function removeLike() {
        // Verificar se já existe a curtida localmente
        const findIdLike = tweet.likes.findIndex(item => item.idAuthorLike === userData.id)

        setHeartLiked(false);
        setIsLikeFinish(false);
        //pega o id do Like correspondente ao indice 
        if (findIdLike !== -1) {
            const dataRemove = tweet.likes[findIdLike].idLike
            try {
                if (dataRemove) {
                    const response = await deleteLike(dataRemove)
                    if (response.ok) {
                        tweet.likes.splice(findIdLike, 1)
                        setDataLikesLocal(prev => [...prev])
                        setHeartLiked(false);
                        setIsLikeFinish(false);
                    }
                }
            } catch (error) {
                return
            }

        }
        setHeartLiked(false);
        setIsLikeFinish(false);
    }

    const addReTweet = useCallback((tweet: CreateReTweetRequest) => {
        if (tweet.content.length < 2) {
            return alert("Mensagem precisa ter pelo menos dois caractéres")
        }
        const createNewReTweet: CreateReTweetRequest = {
            content: tweet.content,
            idUser: tweet.idUser,
            type: tweet.type,
            usernameAuthorTweet: tweet.usernameAuthorTweet,
            token: tweet.token,
            idTweetOriginal: tweet.idTweetOriginal
        }

        async function create() {
            const response = await createReTweet(createNewReTweet)

            if (response.code !== 201) {
                alert(response.message!)
                return;
            }
            setNewTweet(response.data!)
        }
        create()
        handleClose()
    }, [])

    return (
        <>
            <ModalTweetDefault openModal={isOpen} actionCancel={() => handleClose()} >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TextField placeholder="Digite sua mensagem" fullWidth value={contentTweet} className='size-box-tweet' onChange={(e) => setContentTweet(e.target.value)}></TextField>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => addReTweet({
                        content: contentTweet,
                        idUser: userData.id,
                        type: "R",
                        idTweetOriginal: tweet.id,
                        usernameAuthorTweet: userData.username,
                        token: tweet.token
                    })}>
                        Tweetar
                    </Button>
                </DialogActions>
            </ModalTweetDefault >
            {tweet.reTweet.length! > 0 &&
                <ComentCardTweet nameUserReTweet={findNameReTweet} avatarReTweet={avatarReTweet!} />
            }

            <CardTweetStyled key={tweet.id}>
                {tweet.type === "N" && (
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
                            {children}
                            <IconsTweetStyled onClick={() => setIsOpen(true)}>
                                <IconTweetComent iconResponse={tweet.reTweet.length ? IconComentAzul : iconeResponder} count={tweet.reTweet.length} index={index}></IconTweetComent>
                            </IconsTweetStyled>
                            <IconsTweetStyled onClick={() => like(tweet.id)}>
                                <IconTweetLike iconLike={tweet.likes.some(item => item.idAuthorLike === userData.id) ? iconCoracaoLiked : iconeCurtir} count={tweet.likes.length}></IconTweetLike>
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
                            <IconsTweetStyled onClick={() => setIsOpen(true)}>
                                <IconTweetComent iconResponse={tweet.tweeetOriginal?.reTweet.length! ? IconComentAzul : iconeResponder} count={tweet.tweeetOriginal?.reTweet.length! | 0} index={index}></IconTweetComent>
                            </IconsTweetStyled>
                            <IconsTweetStyled onClick={() => like(reTweet.id)} >
                                <IconTweetLike iconLike={!isLikeFinish && !tweet.likes.length ? iconeCurtir : heartLiked ? iconCoracaoAnimado : iconCoracaoLiked} count={tweet.likes.length}></IconTweetLike>
                            </IconsTweetStyled>
                        </div>
                    </div>
                </CardReTweetStyled>
            ))}
        </>
    )
}

export default CardTweet;


