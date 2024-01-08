import { FC, useState, useRef, useEffect } from 'react'
import { Radio, Button, Input } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { socketRequest, socketSentMsg } from 'websocket'
import { CardFlip } from 'components'

export const WS: FC = () => {
  const socket = useRef<WebSocket | null>(null)
  const [radioValue, setRadioValue] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    socketRequest(socket, setMessages)
  }, [])

  const sendMessage = (message: string) => {
    const messageFull = {
      message,
      event: 'message',
    }
    socketSentMsg(socket, messageFull)
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
      <CardFlip />
    </>
  )
}
