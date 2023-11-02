/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react"
import CardExplorer from "../components/CardExplorer"
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import HeaderProfileUser from "../components/HeaderProfileUser"
import SideExplorer from "../components/SideExplorer"
import * as C from '../App.styles'
import { useNavigate } from "react-router-dom"
import { CreateTweetRequest, TweetDto, create, listTweetFromUser } from "../config/services/tweet.service"
import { Box, CircularProgress } from "@mui/material"
import FooterSideBar from "../components/FooterSideBar"
import ModalTweetDefault from "../components/ModalTweetDefault"
import Sidebar from "../components/SideBar"
import TogleMenu from "../components/TogleMenu"
import { ButtonTogleMenuStyled } from "../components/TogleMenu/TogleMenuStyled"
import logoGrowTweet from '/logo_growtweet.svg'
import AlertInfo from "../components/AlertInfo"

const ProfilelUser: React.FC = () => {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [nameAuthorTweet, setNameAuthorTweet] = useState<string>('')
  const [usernameUser, setUsernameUser] = useState<string>('')
  const [idUser, setIdUser] = useState<string>('')
  const [error, setError] = useState('Nenhum tweet para listar');
  const [newTweet, setNewTweet] = useState<CreateTweetRequest[]>([])
  const [contentNewTeet, setContentNewtweet] = useState<string>('')

  const [tweets, setTweets] = useState<TweetDto[]>([])
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('token')

  function handleClose() {
    setIsOpen(false)
  }

  function handleOpen() {
    setIsOpen(true)
  }


  useEffect(() => {

    setLoading(true)
    if (!token) {
      return navigate('/')
    }

    async function getTweets() {
      const response = await listTweetFromUser({
        idUser: '',
        content: '',
        avatar: '',
        nameUser: '',
        usernameAuthorTweet: '',
        token: token!
      })

      if (response.code !== 200) {
        return setError(response.message!)
      }
      setLoading(false)
      setTweets(response.data!.tweets!)


    }
    getTweets()
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
      <FeedBox>
        <HeaderProfileUser />
        {loading ?
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px' }}>
            <CircularProgress className="styleCircular" />
          </Box>
          : !tweets.length ? <AlertInfo><strong>{error}</strong></AlertInfo> : tweets.map((item) => (
            <CardTweet key={item.idUser} avatar={item.avatar!} usernameAuthorTweet={item.usernameAuthorTweet} nameUser={item.nameUser} content={item.content} />
          ))}
      </FeedBox>
      <SideExplorer>
        <CardExplorer />
      </SideExplorer>
    </div>
  )
}

export default ProfilelUser;
