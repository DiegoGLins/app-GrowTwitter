/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useEffect, useState } from "react"
import CardExplorer from "../components/CardExplorer"
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import HeaderProfileUser from "../components/HeaderProfileUser"
import SideExplorer from "../components/SideExplorer"
import { TweetDto, listTweetFromUser } from "../config/services/tweet.service"
import { Box, CircularProgress } from "@mui/material"
import AlertInfo from "../components/AlertInfo"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/SideBar"
import { UserDto, getUserById } from "../config/services/user.service"

const ProfilelUser: React.FC = () => {

  const navigate = useNavigate()
  const [error, setError] = useState('Nenhum tweet para listar');
  const [tweetsUser, setTweetsUser] = useState<TweetDto[]>([])
  const [loading, setLoading] = useState(false)
  const [userLoggedData, setUserLoggedData] = useState<UserDto | null>(null)

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      return navigate('/')
    }
    setLoading(true)
    async function getLogged() {
      const response = await getUserById()
      setUserLoggedData(response.data);
    }
    getLogged()

    async function getTweetsUser() {
      const response = await listTweetFromUser(token as string)
      if (response.code !== 200) {
        setError(response?.message!)
        return
      }
      setError('')
      setTweetsUser(response?.data!)
      setLoading(false)

    }
    getTweetsUser()
    // console.log(userLoggedData)

  }, [])
  console.log(tweetsUser)


  return (
    <>
      <div style={{ display: "flex", width: '100%' }}>
        <Sidebar />
        <FeedBox>
          <HeaderProfileUser />
          {loading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px' }}>
              <CircularProgress className="styleCircular" />
            </Box>
            : !tweetsUser.length ? <AlertInfo><strong>{error}</strong></AlertInfo> : tweetsUser.map((item) => (
              <CardTweet key={item.id} authorTweet={item.authorTweet} content={item.content} name={item.user.name} avatar={item.avatarTweet!} />
            ))}
        </FeedBox>
        <SideExplorer>
          <CardExplorer />
        </SideExplorer>
      </div>
    </>
  )
}

export default ProfilelUser;
