/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CardExplorer from "../components/CardExplorer"
import FeedBox from "../components/FeedBox"
import SideExplorer from "../components/SideExplorer"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Sidebar from "../components/SideBar"

const Home: React.FC = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate("/")
      return
    }

  }, [])


  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: '100%' }}>
        <div className="headerPage"><strong>Página Inicial</strong></div>
        <FeedBox />
      </div>
      <SideExplorer>
        <CardExplorer />
      </SideExplorer>
    </div>
  )
}

export default Home