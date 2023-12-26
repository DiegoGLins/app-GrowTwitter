// import { useCallback, useEffect, useState } from "react"
// import { CreateReTweetRequest, TweetDto, createReTweet } from "../../config/services/tweet.service"
// import { LikeCreateDto, createLike, deleteLike } from "../../config/services/like.service"
// import { DialogContent, DialogContentText, TextField, DialogActions, Button, Box, CircularProgress } from "@mui/material";
// import ModalTweetDefault from "../ModalTweetDefault";
// import CardTweet from "../CardTweet";
// import { error } from "console";
// import AlertInfo from "../Alerts";
// import { FeedBoxStyled } from "../FeedBox/FeedBoxStyled";

// interface TimelineProps {
//     avatarTweet: string | null;
//     avatarReTweet?: string | null;
//     tweet: TweetDto[];

//     index: number;
//     name: string | null;
// }

// const Timeline: React.FC<TimelineProps> = ({tweet, avatarTweet, name, avatarReTweet, index}) => {
//     const [newTweet, setNewTweet] = useState<CreateReTweetRequest[]>([])
//     const [isOpen, setIsOpen] = useState<boolean>(false)
//     const [loading, setLoading] = useState<boolean>(false)
//     const [contentTweet, setContentTweet] = useState<string>('')
//     const [dataLikesLocal, setDataLikesLocal] = useState<LikeCreateDto[] | []>([])
//     const [isLikeFinish, setIsLikeFinish] = useState<boolean>(false)
//     const [heartLiked, setHeartLiked] = useState<boolean>(false)
//     const [userData, setUserData] = useState({
//         id: '',
//         avatar: '',
//         email: '',
//         name: '',
//         username: '',
//         token: '',
//     })

//     const logged = localStorage.getItem("userLogged")
//     const dataLogged = JSON.parse(logged!)

//     useEffect(() => {
//         function getLogged() {
//             if (dataLogged) {
//                 setUserData({
//                     id: dataLogged.logged.id,
//                     avatar: dataLogged.logged.avatar,
//                     email: dataLogged.logged.email,
//                     name: dataLogged.logged.name,
//                     username: dataLogged.logged.username,
//                     token: dataLogged.logged.token
//                 });
//             }
//         }

//         getLogged()
//     }, [dataLikesLocal])


//     function handleClose() {
//         setIsOpen(false)
//     }

//     async function like(idTweet?: string, idReTwet?: string) {
//         const userLiked = tweet.some(item=>item.likes.find(item=>item.idAuthorLike === userData.id))

//         setHeartLiked(true);
//         if (!userLiked) {
//             const liked: LikeCreateDto = {
//                 idTweet: idTweet || null,
//                 idReTweet: idReTwet || null,
//                 idAuthorTweet: tweet.find(item=>item.authorTweet)?.authorTweet,
//                 idAuthorLike: userData.id,
//                 authorLike: userData.username,
//             }

//             const response = await createLike(liked)
//             if (response.ok) {
//                 setHeartLiked(true);
//                 tweet.likes.push(liked)
//                 setDataLikesLocal(prev => [...prev, liked])
//                 setTimeout(() => {
//                     setHeartLiked(false);
//                 }, 1000)
//                 setIsLikeFinish(true)
//             }

//             console.log(tweet.likes)
//         } else {
//             removeLike()
//         }
//         setHeartLiked(false);
//         setIsLikeFinish(false);
//     }

//     async function removeLike() {
//         // Verificar se já existe a curtida localmente
//         const findIdLike = tweet.likes.findIndex(item => item.idAuthorLike === userData.id)

//         setHeartLiked(false);
//         setIsLikeFinish(false);
//         //pega o id do Like correspondente ao indice
//         if (findIdLike !== -1) {
//             const dataRemove = tweet.likes[findIdLike].idLike
//             try {
//                 if (dataRemove) {
//                     const response = await deleteLike(dataRemove)
//                     if (response.ok) {
//                         tweet.likes.splice(findIdLike, 1)
//                         setDataLikesLocal(prev => [...prev])
//                         setHeartLiked(false);
//                         setIsLikeFinish(false);
//                     }
//                 }
//             } catch (error) {
//                 return
//             }

//         }
//         setHeartLiked(false);
//         setIsLikeFinish(false);
//     }

//     const addReTweet = useCallback((tweet: CreateReTweetRequest) => {
//         if (tweet.content.length < 2) {
//             return alert("Mensagem precisa ter pelo menos dois caractéres")
//         }
//         const createNewReTweet: CreateReTweetRequest = {
//             content: tweet.content,
//             idUser: tweet.idUser,
//             type: tweet.type,
//             usernameAuthorTweet: tweet.usernameAuthorTweet,
//             token: tweet.token,
//             idTweetOriginal: tweet.idTweetOriginal
//         }

//         async function create() {
//             const response = await createReTweet(createNewReTweet)

//             if (response.code !== 201) {
//                 alert(response.message!)
//                 return;
//             }
//             setNewTweet(response.data!)
//         }
//         create()
//         handleClose()
//     }, [])


//     return(
//         <>
//         <ModalTweetDefault openModal={isOpen} actionCancel={() => handleClose()} >
//         <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//                 <TextField placeholder="Digite sua mensagem" fullWidth value={contentTweet} className='size-box-tweet' onChange={(e) => setContentTweet(e.target.value)}></TextField>
//             </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//             <Button variant='contained' onClick={() => addReTweet({
//                 content: contentTweet,
//                 idUser: userData.id,
//                 type: "R",
//                 idTweetOriginal: tweet.find(item=>item?.id)?.id!,
//                 usernameAuthorTweet: userData.username,
//                 token: tweet.token
//             })}>
//                 Tweetar
//             </Button>
//         </DialogActions>
//     </ModalTweetDefault >
//     <FeedBoxStyled>
//           {loading ?
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '60px' }}>
//               <CircularProgress />
//             </Box>
//             : !tweet.length ? <AlertInfo><strong>{error}</strong></AlertInfo> : tweet.map((item, index) => (
//               <CardTweet index={index} key={item.id} tweet={item} name={item.user.name} avatarTweet={item.user.avatar} />
//             ))}
//         </FeedBoxStyled>
//     </>
//     )
// }

// export default Timeline