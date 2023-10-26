import CardExplorer from "../components/CardExplorer"
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import HeaderProfileUser from "../components/HeaderProfileUser"
import LayoutDefault from "../components/LayoutDefault"
import SideExplorer from "../components/SideExplorer"

const ProfilelUser: React.FC = () => {
  return (

    <div style={{ display: "flex" }}>
      <LayoutDefault />
      <FeedBox>
        <HeaderProfileUser avatar={""} nameUser={""} usernameUser={""} />
        <CardTweet avatar={''} nameUser={''} usernameUser={''} message={''} ></CardTweet>
      </FeedBox>
      <SideExplorer>
        <CardExplorer></CardExplorer>
      </SideExplorer>
    </div>
  )
}

export default ProfilelUser