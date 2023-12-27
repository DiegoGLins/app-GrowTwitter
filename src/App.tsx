import { Provider } from 'react-redux'
import './App.css'
import DefaultTheme from './config/theme/DefaultTheme'
import RoutesApp from './routes/RoutesApp'
import store from './store'

const App: React.FC = () => {

  return (
    <DefaultTheme>
      <Provider store={store}>
        <RoutesApp />
      </Provider>
    </DefaultTheme>
  )
}

export default App
