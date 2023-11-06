/* eslint-disable @typescript-eslint/no-unused-vars */
import CardExplorer from "../components/CardExplorer"
import * as C from '../App.styles'
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import HeaderPage from "../components/HeaderPage"
import SideExplorer from "../components/SideExplorer"
import { useNavigate } from "react-router-dom"
import { CreateTweetRequest, TweetDto } from "../config/services/tweet.service"
import { useEffect, useState } from "react"
import FooterSideBar from "../components/FooterSideBar"
import Sidebar from "../components/SideBar"


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


  useEffect(() => {
    if (!logged) {
      navigate("/")
      return
    }
  }, [])



  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar>
          <C.ContainerFooter>
            <FooterSideBar avatar={''} />
          </C.ContainerFooter>
        </Sidebar>
      </div >
      <FeedBox>
        <HeaderPage title={'Página Inicial'} />
        {!allTweets ? <></> :
          allTweets.map((item, index) => (
            <CardTweet tweet={item} index={index} avatarTweet={item} avatarReTweet={item}></CardTweet>
          ))}
      </FeedBox>
      <SideExplorer>
        <CardExplorer />
      </SideExplorer>
    </div>
  )
}

export default Home