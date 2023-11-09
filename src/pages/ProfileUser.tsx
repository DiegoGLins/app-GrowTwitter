/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useEffect, useState } from "react"
import CardExplorer from "../components/CardExplorer"
import SideExplorer from "../components/SideExplorer"
import { TweetDto, listTweetFromUser } from "../config/services/tweet.service"
import { Box, CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/SideBar"
import { UserDto, getUserById } from "../config/services/user.service"
import AlertInfo from "../components/Alerts"
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import iconeSeta from '/icone_seta.svg'
import selo from '/selo.svg'
import iconSetaOrange from '/icone_seta_orange.svg'

const ProfilelUser: React.FC = () => {

  const navigate = useNavigate()
  const [error, setError] = useState('Nenhum tweet para listar');
  const [tweetsUser, setTweetsUser] = useState<TweetDto[]>([])
  const [loading, setLoading] = useState(false)
  const [userLoggedData, setUserLoggedData] = useState<UserDto | null>(null)


  const [isHoveredArrow, setIsHoveredArrow] = useState(false);
  const handleMouseEnterArrow = () => {
    setIsHoveredArrow(true);
  };

  const handleMouseLeaveArrow = () => {
    setIsHoveredArrow(false);
  };

  const getAvatar = localStorage.getItem('avatar')

  function handleAvatar(): string {
    const gravatarUrl = `https://robohash.org/${getAvatar}.png`;
    return gravatarUrl;
  }

  const avatarUser = handleAvatar()


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

      setTweetsUser(response?.data!)
      setLoading(false)

    }
    getTweetsUser()
  }, [])


  return (
    <>
      <div style={{ display: "flex", width: '100%' }}>
        <Sidebar />
        <FeedBox>
          <div className="headerProfileUser">
            <div style={{ display: "flex", padding: '0px 10px 10px 0px' }}>
              <button className="goBack"><img style={{ height: '14px', width: '16px' }} onMouseEnter={handleMouseEnterArrow} onMouseLeave={handleMouseLeaveArrow} src={isHoveredArrow ? iconSetaOrange : iconeSeta}></img></button>
              <p style={{ padding: '0px 0px 0px 10px' }}> <strong>Perfil de {`@ ${userLoggedData?.name}`}</strong></p>
            </div>
            <img className="avatarHeaderUser" src={avatarUser} alt="avatarUser" />
            <p style={{ paddingBottom: '5px', display: 'flex', alignItems: 'center' }}><strong style={{ paddingRight: '5px' }}>{userLoggedData?.name}</strong><img style={{ height: '15px', width: '15px' }} src={selo}></img></p>
            <p>{`@ ${userLoggedData?.username}`}</p>
          </div>
          {loading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px' }}>
              <CircularProgress className="styleCircular" />
            </Box>
            : !tweetsUser.length ? <AlertInfo><strong>{error}</strong></AlertInfo> : tweetsUser.map((item) => (
              <CardTweet key={item.id} tweet={item} name={userLoggedData?.name!} avatarTweet={item.avatarTweet!} />
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
