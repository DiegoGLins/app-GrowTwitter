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
import { UserDto, getUserById } from "../config/services/user.service"
// import md5 from 'md5';
import Sidebar from "../components/SideBar"

interface ProfileUserProps {
  avatar: string
}

const ProfilelUser: React.FC<ProfileUserProps> = ({ avatar }) => {

  const [error, setError] = useState('Nenhum tweet para listar');
  const [tweetsUser, setTweetsUser] = useState<TweetDto[]>([])
  const [loading, setLoading] = useState(false)
  const [userLoggedData, setUserLoggedData] = useState<UserDto | null>()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  // function handleAvatar(): string {
  //   const random = Math.random().toString(36).substring(2, 10) + `@${userLoggedData?.username!}`;
  //   const randomHash = md5(random.toLowerCase().trim());
  //   const gravatarUrl = `https://robohash.org/${randomHash}.png`;

  //   return gravatarUrl;
  // }

  // const avatarUser = handleAvatar()

  useEffect(() => {
    if (!token) {
      return navigate('/')

    }
    setLoading(true)
    // async function getLogged() {
    //   const response = await getUserById()
    //   setUserLoggedData(response.data);
    // }
    // getLogged()

    async function getTweetsUser() {
      const response = await listTweetFromUser(token as string)
      if (response.code !== 200) {
        setError(response.message!)
        return
      }
      setError('')
      setTweetsUser([...tweetsUser, response?.data?.tweets!])
      setLoading(false)
      console.log(tweetsUser)
    }
    getTweetsUser()
    // console.log(userLoggedData)
    // console.log(allTweets.map(item => item.content))
  }, [])


  return (
    <>
      <div style={{ display: "flex", width: '100%' }}>
        <Sidebar avatar={avatar} />
        <FeedBox>
          <HeaderProfileUser avatar={avatar} />
          {loading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px' }}>
              <CircularProgress className="styleCircular" />
            </Box>
            : !tweetsUser.length ? <AlertInfo><strong>{error}</strong></AlertInfo> : tweetsUser.map((item) => (
              <>
                <CardTweet key={item.id} avatarTweet={item} tweet={item} avatarReTweet={item} />
              </>
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
