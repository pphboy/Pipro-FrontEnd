
interface PiMessage {
  messageId?:number,
  messageContent?:string,
  messageTitle?:string,
  isRead:boolean,
  createTime:string
  messageMaker:string,
}

export {
  type PiMessage,
}