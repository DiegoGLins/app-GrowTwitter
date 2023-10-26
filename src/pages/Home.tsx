// import { useState } from "react"
import CardExplorer from "../components/CardExplorer"
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import HeaderPage from "../components/HeaderPage"
import LayoutDefault from "../components/LayoutDefault"
import SideExplorer from "../components/SideExplorer"
// import { useNavigate } from "react-router-dom"


const Home: React.FC = () => {
  // const navigate = useNavigate()
  // const [allTweets, setAllTweets] = useState([])

  // const token = localStorage.getItem("token")


  // if (!token) {
  //   navigate("/")
  //   return
  // }

  // async function getData() {
  //   const response = await listData(token as string);
  // }

  return (

    <div style={{ display: "flex" }}>
      <LayoutDefault />
      <FeedBox>
        <HeaderPage title={'Página Inicial'} />
        <CardTweet avatar={''} nameUser={''} usernameUser={''} message={''} ></CardTweet>
      </FeedBox>
      <SideExplorer>
        <CardExplorer></CardExplorer>
      </SideExplorer>
    </div>
  )
}

export default Home