import { FC, useState, useRef, useEffect } from 'react'
import { Radio, Button, Input } from 'antd'
import type { RadioChangeEvent } from 'antd'

export const App: FC = () => {
  const socket = useRef<WebSocket | null>(null)
  const [radioValue, setRadioValue] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
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
  }, [])

  const sendMessage = (message: string) => {
    const messageFull = {
      message,
      event: 'message',
    }
    socket.current?.send(JSON.stringify(messageFull))
  }

  const onChange = (e: RadioChangeEvent) => {
    const { value } = e.target
    setRadioValue(value)
    sendMessage(`User chose ${value}`)
  }

  const onClick = () => {
    sendMessage(inputValue)
    setInputValue('')
  }

  return (
    <>
      {messages.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
      <Radio.Group onChange={onChange} value={radioValue}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
      <Input
        placeholder="type some text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={onClick}>Submit text</Button>
    </>
  )
}
