import CardExplorer from "../components/CardExplorer"
import CardTweet from "../components/CardTweet"
import FeedBox from "../components/FeedBox"
import HeaderPage from "../components/HeaderPage"
import LayoutDefault from "../components/LayoutDefault"
import SideExplorer from "../components/SideExplorer"
import { useNavigate } from "react-router-dom"
import { listAll } from "../config/services/tweet.service"
import { useCallback, useState } from "react"
import { CardTweetProps } from "../components/CardTweet/CardTweet"
// import ModalTweetDefault from "../components/ModalTweetDefault/ModalTweetDefault"


const Home: React.FC = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alert, setAlert] = useState('');
  const [allTweets, setAllTweets] = useState<CardTweetProps[]>([])


  // const [isOpen, setIsOpen] = useState<boolean>(false)
  // const [nameAuthorTweet, setNameAuthorTweet] = useState<string>('')
  // const [usernameUser, setUsernameUser] = useState<string>('')
  // const [idUser, setIdUser] = useState<string>('')
  // const [tweet, setTweet] = useState<TweetDto[]>([])
  // const [contentNewTeet, setContentNewtweet] = useState<string>('')

  // function handleClose() {
  //   setIsOpen(false)
  // }

  // function handleOpen() {
  //   setIsOpen(true)
  // }

  const token = localStorage.getItem("token")

  // const addTweet = useCallback((tweet: CreateTweetRequest) => {

  //   // const newTweet: TweetDto = {
  //   //   idUser: `${idUser}`,
  //   //   username: `${usernameUser}`,
  //   //   authorTweet: `${nameAuthorTweet}`,
  //   //   content: tweet.content
  //   // }

  //   // fetch(`${apiService}/tweets`, {
  //   //   method: 'POST',
  //   //   headers: { 'Content-Type': 'application/json', },
  //   //   body: JSON.stringify(newTweet),
  //   // }).then(response => {
  //   //   if (response.ok) {
  //   //     console.log('Tweet adicionado com sucesso')
  //   //   }
  //   // });
  //   // setTweet(prevTweets => [...prevTweets, newTweet]);
  //   // setContentNewtweet('')
  //   if (!token) {
  //     navigate('/')
  //     return;
  //   }

  //   const newTweet: CreateTweetRequest = {
  //     idUser: `${idUser}`,
  //     usernameAuthorTweet: `${usernameUser}`,
  //     nameUser: `${nameAuthorTweet}`,
  //     content: tweet.content,
  //     token: token
  //   }

  // }, [])


  useCallback(() => {

    if (!token) {
      navigate("/")
      return
    }

    async function getData() {
      const response = await listAll(token as string);

      if (response.code !== 200) {
        setAlert(response.message)
        return
      }

      setAlert('')
      setAllTweets([...allTweets, response.data])
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      {/* <ModalTweetDefault openModal={isOpen} actionCancel={() => handleClose()} actionConfirm={() => addTweet({
        idUser: idUser,
        nameUser: nameAuthorTweet,
        usernameAuthorTweet: usernameUser,
        content: contentNewTeet,
        token: token!
      })} message={contentNewTeet}>
      </ModalTweetDefault> */}
      <div style={{ display: "flex" }}>
        <LayoutDefault />
        <FeedBox>
          <HeaderPage title={'Página Inicial'} />
          {!allTweets ? <>''</> :
            allTweets.map((tweeets) => (
              <CardTweet key={tweeets.usernameUser} avatar={tweeets.avatar} nameUser={tweeets.nameUser} usernameUser={tweeets.usernameUser} message={tweeets.message}></CardTweet>
            ))}
        </FeedBox>
        <SideExplorer>
          <CardExplorer></CardExplorer>
        </SideExplorer>
      </div></>
  )
}

export default Home