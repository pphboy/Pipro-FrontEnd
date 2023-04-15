
interface PiMember {
  memberId?:number,
  memberName:string
  password?:string,
  salt?:string,
  email?:string,
  registerTime?:string,
}

export {
  type PiMember,
}