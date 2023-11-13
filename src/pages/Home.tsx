/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CardExplorer from "../components/CardExplorer"
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import SideExplorer from "../components/SideExplorer"
import { useNavigate } from "react-router-dom"
import { TweetDto } from "../config/services/tweet.service"
import { useEffect, useState } from "react"
import Sidebar from "../components/SideBar"
import { Box, CircularProgress } from "@mui/material"
import AlertInfo from "../components/Alerts"


const Home: React.FC = () => {
  const navigate = useNavigate()

  const [allTweets, setAllTweets] = useState<TweetDto[]>([])
  const [error, setError] = useState('Nenhum tweet para listar');
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate("/")
      return
    }


    //   async function getAllTweets() {
    //   //   const response = await listAll()
    //   //   if (response.code !== 200) {
    //   //     setError(response.message!)
    //   //     return
    //   //   }

    //   //   setAllTweets(response?.data!)
    //   //   setLoading(false)

    //   // }
    //   // getAllTweets()

  }, [])

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: '100%' }}>
        <div className="headerPage"><strong>Página Inicial</strong></div>
        <FeedBox>
          {loading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px' }}>
              <CircularProgress />
            </Box>
            : !allTweets.length ? <AlertInfo><strong>{error}</strong></AlertInfo> : allTweets.map((item) => (
              <CardTweet key={item.id} tweet={item} name={item.user.name} avatarTweet={item.avatarTweet!} />
            ))}
        </FeedBox>
      </div>
      <SideExplorer>
        <CardExplorer />
      </SideExplorer>
    </div>
  )
}

export default Home