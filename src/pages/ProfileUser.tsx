/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useEffect, useState } from "react"
import CardExplorer from "../components/CardExplorer"
import SideExplorer from "../components/SideExplorer"
import { TweetDto, listTweetFromUser } from "../config/services/tweet.service"
import { Box, CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import AlertInfo from "../components/Alerts"
import CardTweet from "../components/CardTweet"
import iconeSeta from '/icone_seta.svg'
import selo from '/selo.svg'
import iconSetaOrange from '/icone_seta_orange.svg'
import Sidebar from "../components/SideBar/SideBar"

const ProfilelUser: React.FC = () => {

  const navigate = useNavigate()
  const [tweetsUser, setTweetsUser] = useState<TweetDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('Nenhum tweet para listar');
  const [userData, setUserData] = useState({
    id: '',
    avatar: '',
    email: '',
    name: '',
    username: '',
    token: '',
  })

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

  const logged = localStorage.getItem("userLogged")
  const dataLogged = JSON.parse(logged!)
  useEffect(() => {
    if (!token) {
      return navigate('/')
    }
    function getLogged() {
      if (dataLogged) {
        setUserData({
          id: dataLogged.logged.id,
          avatar: avatarUser,
          email: dataLogged.logged.email,
          name: dataLogged.logged.name,
          username: dataLogged.logged.username,
          token: dataLogged.logged.token
        });
      }
    }
    getLogged()
    setLoading(true)

    const updateTweets = async () => {
      const response = await listTweetFromUser(token as string)
      if (response.code !== 200) {
        setError(response?.message!)
        return
      }
      setTweetsUser(response?.data!)
      setLoading(false)
    }
    updateTweets()
  }, [])

  return (
    <>
      <div style={{ display: 'flex', borderLeft: '1px solid #e9e9e9' }}>
        <Sidebar />
        <div style={{ display: "flex", flexDirection: 'column', width: '100%' }}>
          <div className="headerProfileUser" >
            <div style={{ display: "flex", padding: '0px 10px 10px 0px' }}>
              <button className="goBack"><img style={{ height: '14px', width: '16px' }} onMouseEnter={handleMouseEnterArrow} onMouseLeave={handleMouseLeaveArrow} src={isHoveredArrow ? iconSetaOrange : iconeSeta}></img></button>
              <p style={{ padding: '0px 0px 0px 10px' }}> <strong>Perfil de {`@ ${userData.name}`}</strong></p>
            </div>
            <img className="avatarHeaderUser" src={userData.avatar} alt="avatarUser" />
            <p style={{ paddingBottom: '5px', display: 'flex', alignItems: 'center' }}><strong style={{ paddingRight: '5px' }}>{userData.name}</strong><img style={{ height: '15px', width: '15px' }} src={selo}></img></p>
            <p>{`@ ${userData.username}`}</p>
          </div>
          <div style={{ marginTop: '212px' }}>
            {loading ?
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '60px' }}>
                <CircularProgress />
              </Box>
              : !tweetsUser.length ? <AlertInfo><strong>{error}</strong></AlertInfo> : tweetsUser.map((item, index) => (
                <CardTweet index={index} key={item.id} tweet={item} name={item.user.name} avatarTweet={item.user.avatar!} />
              ))}
          </div>
        </div>
        <SideExplorer>
          <CardExplorer />
        </SideExplorer>
      </div>
    </>
  )
}

export default ProfilelUser;
