import './App.css'
import DefaultTheme from './config/theme/DefaultTheme'
import RoutesApp from './routes/RoutesApp'

const App: React.FC = () => {

  return (
    <DefaultTheme>
      <RoutesApp />
    </DefaultTheme>
  )
}

export default App
