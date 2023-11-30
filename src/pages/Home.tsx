/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CardExplorer from "../components/CardExplorer"
import SideExplorer from "../components/SideExplorer"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Sidebar from "../components/SideBar"
import { Box, CircularProgress } from "@mui/material"
import AlertInfo from "../components/Alerts"
import CardTweet from "../components/CardTweet"
import { FeedBoxStyled } from "../components/FeedBox/FeedBoxStyled"
import { TweetDto, listAll } from "../config/services/tweet.service"

const Home: React.FC = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const [allTweets, setAllTweets] = useState<TweetDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('Nenhum tweet para listar');

  useEffect(() => {
    if (!token) {
      navigate("/")
      return
    }

    async function updateTweets() {
      setLoading(true)
      const response = await listAll()
      if (response.code !== 200) {
        setError(response?.message!)
        return
      }
      setAllTweets(response?.data!)
      setLoading(false)
    }
    updateTweets()
  }, [navigate, token])

  // function add(tweet: TweetDto) {
  //   setAllTweets(prevTweets => [...prevTweets, tweet])
  // }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: '100%' }}>
        <div className="headerPage"><strong>Página Inicial</strong></div>
        <FeedBoxStyled>
          {loading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '60px' }}>
              <CircularProgress />
            </Box>
            : !allTweets.length ? <AlertInfo><strong>{error}</strong></AlertInfo> : allTweets.map((item, index) => (
              <CardTweet index={index} key={item.id} tweet={item} name={item.user.name} avatarTweet={item.user.avatar} />
            ))}
        </FeedBoxStyled>
      </div>
      <SideExplorer>
        <CardExplorer />
      </SideExplorer>
    </div>
  )
}

export default Home