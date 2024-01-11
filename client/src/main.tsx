import ReactDOM from 'react-dom/client'
import { ContextProvider } from 'store'
import { App } from './App'
import './index.scss'

// declare global {
//   interface Window {
//     initPlugin: (id: string) => void
//   }
// }

// window.initPlugin = (id: string) => {
//   const root = ReactDOM.createRoot(document.getElementById(id) as HTMLElement)
//   root.render(
//     <ContextProvider>
//       <App />
//     </ContextProvider>,
//   )
// }

// standard

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
)
