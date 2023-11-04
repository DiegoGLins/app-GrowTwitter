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
import { CreateTweetRequest, TweetDto, create, listAll, listTweetFromUser } from "../config/services/tweet.service"
import { Box, CircularProgress } from "@mui/material"
import FooterSideBar from "../components/FooterSideBar"
import ModalTweetDefault from "../components/ModalTweetDefault"
import Sidebar from "../components/SideBar"
import TogleMenu from "../components/TogleMenu"
import { ButtonTogleMenuStyled } from "../components/TogleMenu/TogleMenuStyled"
import logoGrowTweet from '/logo_growtweet.svg'
import AlertInfo from "../components/AlertInfo"

const ProfilelUser: React.FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [nameAuthorTweet, setNameAuthorTweet] = useState<string>('')
  const [usernameUser, setUsernameUser] = useState<string>('')
  const [idUser, setIdUser] = useState<string>('')
  const [error, setError] = useState('Nenhum tweet para listar');

  const [newTweet, setNewTweet] = useState<CreateTweetRequest[]>([])
  const [contentNewTeet, setContentNewtweet] = useState<string>('')
  const [allTweets, setAllTweets] = useState<TweetDto[]>([])

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    id: '',
    email: '',
    name: '',
    username: '',
  })

  const loggedData = localStorage.getItem('userLogged');
  const token = localStorage.getItem('token')

  function handleClose() {
    setIsOpen(false)
  }

  function handleOpen() {
    setIsOpen(true)
  }

  const addTweet = useCallback((tweet: CreateTweetRequest) => {

    if (!token) {
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


  useEffect(() => {

    setLoading(true)
    if (!token) {
      return
    }

    function getLogged() {
      const dataLogged = JSON.parse(loggedData!)
      if (loggedData) {
        setUserData({
          id: dataLogged?.logged.id,
          email: dataLogged?.logged.email,
          name: dataLogged?.logged.name,
          username: dataLogged?.logged.username
        }
        );
      }
    }
    getLogged()

    async function getAllTweets() {
      const response = await listAll(token as string);

      if (response.code !== 200) {
        setError(response.message)
        return
      }
      setError('')

      setAllTweets([...allTweets, response.data])
      console.log(allTweets)
    }
    getAllTweets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const tweetsUserLogged = allTweets.filter((tweet: TweetDto) => tweet.user.id === userData.id)
  // const contentTweetLogged = tweetsUserLogged.find((item) => item.content)


  return (
    <div style={{ display: "flex", maxHeight: '100%', overflow: 'auto' }}>
      <ModalTweetDefault openModal={isOpen} actionCancel={() => handleClose()} actionConfirm={() => addTweet({
        idUser: idUser,
        nameUser: nameAuthorTweet,
        usernameAuthorTweet: usernameUser,
        content: '',
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
          : !tweetsUserLogged.length ? <AlertInfo><strong>{error}</strong></AlertInfo> : tweetsUserLogged.map((item, index) => (
            <CardTweet key={index} tweet={item} reTweet={item} index={index} avatar={item.user.avatar!} />
          ))}
      </FeedBox>
      <SideExplorer>
        <CardExplorer />
      </SideExplorer>
    </div>
  )
}

export default ProfilelUser;
