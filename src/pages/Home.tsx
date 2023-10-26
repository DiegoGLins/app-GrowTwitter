import CardExplorer from "../components/CardExplorer"
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import HeaderPage from "../components/HeaderPage"
import LayoutDefault from "../components/LayoutDefault"
import SideExplorer from "../components/SideExplorer"


const Home: React.FC = () => {
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