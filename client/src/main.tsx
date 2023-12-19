import ReactDOM from 'react-dom/client'
import { ContextProvider } from 'store'
import { App } from './App'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
)
