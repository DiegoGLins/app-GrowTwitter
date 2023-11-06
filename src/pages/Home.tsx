/* eslint-disable @typescript-eslint/no-unused-vars */
import CardExplorer from "../components/CardExplorer"
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import HeaderPage from "../components/HeaderPage"
import SideExplorer from "../components/SideExplorer"
import { useNavigate } from "react-router-dom"
import { TweetDto } from "../config/services/tweet.service"
import { useEffect, useState } from "react"
import Sidebar from "../components/SideBar"

const Home: React.FC = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [allTweets, setAllTweets] = useState<TweetDto[]>([])
  const [userData, setUserData] = useState({
    id: '',
    avatar: '',
    email: '',
    name: '',
    username: '',
  })

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate("/")
      return
    }

    const loggedData = localStorage.getItem('userLogged');
    const dataLogged = JSON.parse(loggedData!)


    function getLogged() {
      if (loggedData) {
        setUserData({
          id: dataLogged?.looged?.id,
          avatar: dataLogged.logged?.avatar,
          email: dataLogged?.logged?.email,
          name: dataLogged?.logged?.name,
          username: dataLogged?.logged?.username
        }
        );
      }

    }
    getLogged()
    // console.log(userData.avatar)
  }, [])


  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <FeedBox>
        <HeaderPage title={'Página Inicial'} />
        {!allTweets ? <></> :
          allTweets.map((item) => (
            <CardTweet tweet={item} avatarTweet={item} avatarReTweet={item}></CardTweet>
          ))}
      </FeedBox>
      <SideExplorer>
        <CardExplorer />
      </SideExplorer>
    </div>
  )
}

export default Home