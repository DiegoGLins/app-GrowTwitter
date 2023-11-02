/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CardExplorer from "../components/CardExplorer"
import FeedBox from "../components/FeedBox"
import FooterSideBar from "../components/FooterSideBar"
import HeaderPage from "../components/HeaderPage"
import ModalTweetDefault from "../components/ModalTweetDefault"
import Sidebar from "../components/SideBar"
import logoGrowTweet from '/logo_growtweet.svg'
import * as C from '../App.styles'
import SideExplorer from "../components/SideExplorer"
import TogleMenu from "../components/TogleMenu"
import { ButtonTogleMenuStyled } from "../components/TogleMenu/TogleMenuStyled"
import { TweetDto, CreateTweetRequest, create } from "../config/services/tweet.service"

const Explorer: React.FC = () => {
    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [alert, setAlert] = useState('');
    const [allTweets, setAllTweets] = useState<TweetDto[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [nameAuthorTweet, setNameAuthorTweet] = useState<string>('')
    const [usernameUser, setUsernameUser] = useState<string>('')
    const [idUser, setIdUser] = useState<string>('')
    const [tweet, setTweet] = useState<TweetDto[]>([])
    const [newTweet, setNewTweet] = useState<CreateTweetRequest[]>([])

    const [error, setError] = useState('');
    const [contentNewTeet, setContentNewtweet] = useState<string>('')

    const token = localStorage.getItem('token')
    const logged = localStorage.getItem('userLogged')

    function handleClose() {
        setIsOpen(false)
    }

    function handleOpen() {
        setIsOpen(true)
    }

    useEffect(() => {
        if (!logged) {
            navigate("/")
            return
        }
    }, [])

    const addTweet = useCallback((tweet: CreateTweetRequest) => {

        if (!token) {
            navigate('/')
            return;
        }

        const newTweet: CreateTweetRequest = {
            idUser: `${idUser}`,
            usernameAuthorTweet: `${usernameUser}`,
            nameUser: `${nameAuthorTweet}`,
            content: tweet.content,
            token: token!
        }

        async function createTweet() {
            const response = await create(newTweet)

            if (response.code !== 201) {
                setError(response.message!)
                return;
            }

            setError('')
            setNewTweet(response.data!)
        }
        createTweet()
    }, [])


    return (
        <div style={{ display: "flex", maxHeight: '100%', overflow: 'auto' }}>
            <div style={{ display: "flex" }}>
                <ModalTweetDefault openModal={isOpen} actionCancel={() => handleClose()} actionConfirm={() => addTweet({
                    idUser: idUser,
                    nameUser: nameAuthorTweet,
                    usernameAuthorTweet: usernameUser,
                    content: contentNewTeet,
                    token: token!
                })} message={contentNewTeet}>
                </ModalTweetDefault>
                <div>
                    <C.ContatinerLayoutDefault>
                        <C.ContainerSideBarDefault>
                            <Sidebar>
                                <div className="logoSideBar">
                                    <img style={{ height: '35px', width: '100px' }} src={logoGrowTweet}></img>
                                </div>
                                <TogleMenu>
                                    <ButtonTogleMenuStyled onClick={handleOpen} className='buttonTweet' type='button'>Tweetar</ButtonTogleMenuStyled>
                                </TogleMenu>
                            </Sidebar>
                        </C.ContainerSideBarDefault>
                        <C.ContainerFooter>
                            <FooterSideBar avatar={''}>
                            </FooterSideBar>
                        </C.ContainerFooter>
                    </C.ContatinerLayoutDefault>
                </div >
            </div>
            <FeedBox>
                <HeaderPage title={'Explorar'}></HeaderPage>
                <div style={{ margin: '25px' }}>
                    <h4><strong>O que está acontecendo ?</strong></h4>
                    <h5 style={{ color: 'gray', paddingTop: '15px' }}>Esportes - Há 45 minutos</h5>
                    <p><strong>Assunto sobre esportes</strong></p>
                    <h5 style={{ color: 'gray', paddingTop: '15px' }}>Assunto do Momento em Brasil</h5>
                    <p><strong>Assunto do Momento</strong></p>
                    <h5 style={{ color: 'gray', paddingTop: '15px' }}>Música - Há 25 minutos</h5>
                    <p><strong>Assunto sobre Música</strong></p>
                    <h5 style={{ color: 'gray', paddingTop: '15px' }}>Filmes - Há 15 minutos</h5>
                    <p><strong>Assunto sobre Filmes</strong></p>
                    <h5 style={{ color: 'gray', paddingTop: '15px' }}>Notícias - Agora pouco</h5>
                    <p><strong>Notícias de última hora</strong></p>
                </div>
            </FeedBox>
            <SideExplorer>
                <CardExplorer>
                </CardExplorer>
            </SideExplorer>
        </div>
    )
}

export default Explorer


