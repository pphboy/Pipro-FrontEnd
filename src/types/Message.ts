import { PiMember } from "./Member"

interface PiMessage {
  messageId?:number,
  messageContent?:string,
  messageTitle?:string,
  messageStatus?:number,
  createTime?:string
  memberMaker?:PiMember,
}

export {
  type PiMessage,
}