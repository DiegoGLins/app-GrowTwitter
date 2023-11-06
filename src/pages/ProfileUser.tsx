/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
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
import { CreateTweetRequest, TweetDto, listTweetFromUser } from "../config/services/tweet.service"
import { Box, CircularProgress } from "@mui/material"
import FooterSideBar from "../components/FooterSideBar"
import ModalTweetDefault from "../components/ModalTweetDefault"
import Sidebar from "../components/SideBar"
import TogleMenu from "../components/TogleMenu"
import { ButtonTogleMenuStyled } from "../components/TogleMenu/TogleMenuStyled"
import logoGrowTweet from '/logo_growtweet.svg'
import AlertInfo from "../components/AlertInfo"
import { useNavigate } from "react-router-dom"
import { UserDto, getUserById } from "../config/services/user.service"
import md5 from 'md5';

const ProfilelUser: React.FC = () => {
  const navigate = useNavigate()

  const [error, setError] = useState('Nenhum tweet para listar');
  const [allTweets, setAllTweets] = useState<TweetDto[]>([])

  const [loading, setLoading] = useState(false)
  const [userLoggedData, setUserLoggedData] = useState<UserDto | null>()

  const token = localStorage.getItem('token')

  function handleAvatar(): string {
    const random = Math.random().toString(36).substring(2, 10) + `@${userLoggedData?.username!}`;
    const randomHash = md5(random.toLowerCase().trim());
    const gravatarUrl = `https://robohash.org/${randomHash}.png`;

    return gravatarUrl;
  }

  const avatarUser = handleAvatar()

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
        setError(response.message!)
        return
      }
      setError('')
      setAllTweets([...allTweets, response?.data?.tweets!])
      setLoading(false)
      console.log(allTweets),
        console.log(userLoggedData)
      // console.log(allTweets.map(item => item.content))
    }
    getTweetsUser()

  }, [])


  return (
    <>
      <div style={{ display: "flex", maxHeight: '100%', width: '100%' }}>
        <Sidebar>
          <C.ContainerFooter>
            <FooterSideBar avatar={avatarUser} />
          </C.ContainerFooter>
        </Sidebar>
        <FeedBox>
          <HeaderProfileUser avatar={avatarUser} />
          {loading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px' }}>
              <CircularProgress className="styleCircular" />
            </Box>
            : !allTweets.length ? <AlertInfo><strong>{error}</strong></AlertInfo> : allTweets.map((item, index) => (
              <>
                <CardTweet key={index} avatarTweet={item} tweet={item} avatarReTweet={item} index={index} /><CardTweet key={index} avatarTweet={item} tweet={item} avatarReTweet={item} index={index} /><CardTweet key={index} avatarTweet={item} tweet={item} avatarReTweet={item} index={index} /><CardTweet key={index} avatarTweet={item} tweet={item} avatarReTweet={item} index={index} /><CardTweet key={index} avatarTweet={item} tweet={item} avatarReTweet={item} index={index} /><CardTweet key={index} avatarTweet={item} tweet={item} avatarReTweet={item} index={index} /><CardTweet key={index} avatarTweet={item} tweet={item} avatarReTweet={item} index={index} /><CardTweet key={index} avatarTweet={item} tweet={item} avatarReTweet={item} index={index} /><CardTweet key={index} avatarTweet={item} tweet={item} avatarReTweet={item} index={index} /><CardTweet key={index} avatarTweet={item} tweet={item} avatarReTweet={item} index={index} />
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
