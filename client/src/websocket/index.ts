import { MutableRefObject, Dispatch } from 'react'

export const socketRequest = (
  socket: MutableRefObject<WebSocket | null>,
  setMessages: Dispatch<React.SetStateAction<string[]>>,
) => {
  const baseURL = import.meta.env.VITE_WS_BASE_URL
  socket.current = new WebSocket(baseURL)

  socket.current.onopen = () => {
    const message = {
      event: 'connection',
      message: 'User connected',
    }
    socket.current?.send(JSON.stringify(message))
  }
  socket.current.onmessage = (event) => {
    const messageObj = JSON.parse(event.data)
    console.log('====================================')
    console.log(messageObj)
    console.log('====================================')
    setMessages((prev) => [messageObj.message, ...prev])
  }
  socket.current.onclose = () => {
    console.log('Socket close session')
  }
  socket.current.onerror = () => {
    console.log('Socket error')
  }
}

export const socketSentMsg = (
  socket: MutableRefObject<WebSocket | null>,
  messageFull: string | object,
) => {
  socket.current?.send(JSON.stringify(messageFull))
}
