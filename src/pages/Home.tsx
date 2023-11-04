/* eslint-disable @typescript-eslint/no-unused-vars */
import CardExplorer from "../components/CardExplorer"
import * as C from '../App.styles'
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import HeaderPage from "../components/HeaderPage"
import SideExplorer from "../components/SideExplorer"
import { useNavigate } from "react-router-dom"
import { CreateTweetRequest, TweetDto, create, listAll } from "../config/services/tweet.service"
import { useCallback, useEffect, useState } from "react"
import FooterSideBar from "../components/FooterSideBar"
import ModalTweetDefault from "../components/ModalTweetDefault"
import Sidebar from "../components/SideBar"
import TogleMenu from "../components/TogleMenu"
import { ButtonTogleMenuStyled } from "../components/TogleMenu/TogleMenuStyled"
import logoGrowTweet from '/logo_growtweet.svg'

const Home: React.FC = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alert, setAlert] = useState('');
  const [allTweets, setAllTweets] = useState<TweetDto[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [nameAuthorTweet, setNameAuthorTweet] = useState<string>('')
  const [usernameUser, setUsernameUser] = useState<string>('')
  const [idUser, setIdUser] = useState<string>('')
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

  useCallback(() => {

    if (!logged) {
      navigate("/")
      return
    }

    async function getAllTweets() {
      const response = await listAll(token as string);

      if (response.code !== 200) {
        setAlert(response.message)
        return
      }

      setAlert('')

      setAllTweets([...allTweets, response.data])
      console.log(allTweets)
    }
    getAllTweets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const addTweet = useCallback((tweet: CreateTweetRequest) => {

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
    <>
      <div style={{ display: "flex" }}>
        <>
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
        </>
        <FeedBox>
          <HeaderPage title={'Página Inicial'} />
          {!allTweets ? <></> :
            allTweets.map((tweeets, index) => (
              <CardTweet key={index} avatar={tweeets.user.avatar!} index={index} tweet={tweeets} reTweet={tweeets}></CardTweet>
            ))}
        </FeedBox>
        <SideExplorer>
          <CardExplorer />
        </SideExplorer>
      </div></>
  )
}

export default Home