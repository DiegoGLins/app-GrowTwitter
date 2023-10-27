import CardExplorer from "../components/CardExplorer"
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import HeaderProfileUser from "../components/HeaderProfileUser"
import LayoutDefault from "../components/LayoutDefault"
import SideExplorer from "../components/SideExplorer"

const ProfilelUser: React.FC = () => {

  //logica para receber informações dos tweets enviados pelo usuario logado passando as informações
  //para atualizar o cardTweet e o Header do usuario

  return (

    <div style={{ display: "flex", maxHeight: '100%', overflow: 'auto' }}>
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