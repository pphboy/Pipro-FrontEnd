
interface PiMember {
  memberId?:number,
  memberName:string
  password?:string,
  salt?:string,
  email?:string,
  registerTime?:string,
}



/**
 * 对应后面的Vo里面的登录和注册两个参数类
 */
interface VoMember {
  username:string,
  password:string,
  email?:string,
  repassword?:string,
}

export {
  type PiMember,
  type VoMember,
}