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
        <HeaderProfileUser avatar={""} nameUser={"diegoLins"} usernameUser={"diego"} />
        <CardTweet avatar={''} nameUser={'diego'} usernameUser={'diegoLins'} message={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore eos dolore minima corporis exercitationem in ea incidunt recusandae optio! Natus incidunt nesciunt qui veniam aliquid recusandae officiis neque quidem accusamus?.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta voluptatem error aspernatur incidunt quisquam quae reiciendis porro, excepturi eveniet dolor dolorum sequi tenetur molestiae autem placeat labore consequatur culpa ipsum.'} ></CardTweet>
      </FeedBox>
      <SideExplorer>
        <CardExplorer />
      </SideExplorer>
    </div>
  )
}

export default ProfilelUser